import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardState } from '../input-output.reducer';
import { InputOutput } from '../model/input-output.model';
import { InputOutputService } from '../services/input-output.service';

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
    private store: Store<DashboardState>
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
      .then(() => Swal.fire('Eliminado', item.description, 'success'));
  }

}
