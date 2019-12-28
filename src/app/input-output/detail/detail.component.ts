import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { InputOutput } from '../model/input-output.model';
import { InputOutputService } from '../services/input-output.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'psalguerodev-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  items: InputOutput[] = [];
  itemsSubscription: Subscription;

  constructor(
    private ioService: InputOutputService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('io')
      .subscribe( itemsState => this.items = itemsState.items );
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  deleteItem(item: InputOutput): void {
    this.ioService
      .deleteItemById(item.id)
      .then(() => Swal.fire('Elimanado', item.description, 'success'));
  }

}
