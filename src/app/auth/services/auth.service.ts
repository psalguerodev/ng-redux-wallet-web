import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SetEnableLoadingAction, SetDisableLoadingAction } from '../../shared/sidebar/ui.actions';
import { SetUserAction } from '../ngrx/auth.actions';

export interface UserRegisterDto {
  id?: string;
  password?: string;
  email: string;
  fullname: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private firestore: AngularFirestore,
    private authFire: AngularFireAuth) { }

  initAuthentication(): void {
    this.authFire.authState.subscribe((user: firebase.User) => {
      console.info('user state ::: ', user);

      if ( user ) {

        this.currentUserSubscription = this.firestore.doc(`${user.uid}/user`)
          .valueChanges()
          .subscribe( (user: User) => {
            console.info('User firestore ::: ' , user);
            this.store.dispatch(new SetUserAction(user));
          })

      } else {
        this.currentUserSubscription.unsubscribe();
      }

    });
  }

  createUser(user: UserRegisterDto): void {
    this.store.dispatch( new SetEnableLoadingAction() );
    this.authFire
      .auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        const userDocument: User = {
          fullaname: user.fullname,
          uid: userCredential.user.uid,
          email: userCredential.user.email
        };

        this.firestore.doc(`${userDocument.uid}/user`).set(userDocument);
        this.goToRoute('dashboard');
        this.store.dispatch( new SetDisableLoadingAction() );

      })
      .catch((error: any) => this.handlerError(error.message || 'Error'));
  }

  login(user: UserLoginDto): void {
    this.store.dispatch( new SetEnableLoadingAction() );
    this.authFire.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((userCredentials: firebase.auth.UserCredential) => {
        this.goToRoute('dashboard');
        this.store.dispatch( new SetDisableLoadingAction() );
      })
      .catch(error => this.handlerError(error.message || 'Error'));
  }

  private goToRoute(...route: string[]): void {
    this.router.navigate( route );
  }

  private handlerError(error: string) {
    console.log(error);
    Swal.fire('Ocurrió un error', error, 'error');
    this.store.dispatch( new SetDisableLoadingAction() );
  }

  logout() {
    this.goToRoute('login');
    this.authFire.auth.signOut();
    this.store.dispatch(new SetUserAction(null));
  }

  isAuthenticate(): Observable<boolean> {
    return this.authFire.authState
      .pipe(
        map((userCredentials: firebase.User) => {
          const user = (userCredentials != null);
          if ( !user ) { this.goToRoute('login'); }
          return user;
        })
      );
  }
}
