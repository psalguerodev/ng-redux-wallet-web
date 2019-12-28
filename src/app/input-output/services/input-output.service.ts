import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../auth/services/auth.service';
import { InputOutput } from '../model/input-output.model';
import { SetItemIOAction } from '../input-output.actions';
import { LoggerService } from '../../shared/services/logger.service';


@Injectable({
  providedIn: 'root'
})
export class InputOutputService {

  private ioSubscription: Subscription = new Subscription();
  private authSubscription: Subscription = new Subscription();

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>,
    private logger: LoggerService,
  ) { }



  initInputOutputListener(): void {
    this.authSubscription = this.store.select('auth')
      .pipe(filter( auth => auth.user != null))
      .subscribe( auth => {
        this.inputOutputItems(auth.user.uid);
      });
  }

  private inputOutputItems(uid: string): void {
    this.ioSubscription = this.firestore.collection<InputOutput>(`${uid}/input-output/items`)
      .snapshotChanges()
      .pipe(
        map((documentActions: DocumentChangeAction<InputOutput>[]) => {
          return documentActions.map(
            action => {
              return {
                id: action.payload.doc.id,
                ...action.payload.doc.data()
              } as InputOutput;
            }
          );
        })
      )
      .subscribe((items: InputOutput[]) => {
        this.logger.log(`IO Items ::: `, items);
        this.store.dispatch(new SetItemIOAction(items));
      });
  }

  unsubscribeItems(): void {
    this.authSubscription.unsubscribe();
    this.ioSubscription.unsubscribe();
  }

  createInputOutput(inputOutput: InputOutput): Promise<DocumentReference> {
    const user = this.authService.getUser();
    return this.firestore.doc(`${user.uid}/input-output`)
      .collection('items')
      .add({ ...inputOutput });
  }

  deleteItemById(id: string) {
    const user = this.authService.getUser();
    return this.firestore
      .doc(`${user.uid}/input-output/items/${id}`)
      .delete();
  }
}
