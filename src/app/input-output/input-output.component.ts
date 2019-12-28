import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InputOutputService } from './services/input-output.service';
import { InputOutputType, InputOutput } from './model/input-output.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { SetEnableLoadingAction, SetDisableLoadingAction } from '../shared/sidebar/ui.actions';
import { SetItemIOAction } from './input-output.actions';

@Component({
  selector: 'psalguerodev-input-output',
  templateUrl: './input-output.component.html',
  styleUrls: ['./input-output.component.css'],
  providers: []
})
export class InputOutputComponent implements OnInit, OnDestroy {

  formgroup: FormGroup;
  type: InputOutputType = 'input';

  loading: boolean;
  loadingSubscription: Subscription;

  constructor(
    private inputOutputService: InputOutputService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.formgroup = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, [Validators.min(0), Validators.required]),
    })
    this.loadingSubscription = this.store.select('ui')
      .subscribe(uiState => this.loading = uiState.isLoading )
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.store.dispatch(new SetEnableLoadingAction());
    const newIOItem = { ...this.formgroup.value, type: this.type };
    this.inputOutputService
      .createInputOutput(newIOItem)
      .then(() => this.handlerSuccessCreate())
      .catch(error => this.handlerErrorCreate(error));
  }

  private handlerSuccessCreate(newIOItem?: InputOutput): void {
    this.store.dispatch(new SetDisableLoadingAction());
    Swal.fire('Item Creado', '', 'success');
    this.formgroup.reset({ amount: 0, description: '' });
  }

  private handlerErrorCreate(error): void {
    this.store.dispatch(new SetDisableLoadingAction());
  }

}
