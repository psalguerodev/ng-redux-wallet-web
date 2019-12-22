import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserRegisterDto } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'psalguerodev-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit, OnDestroy {

  email: string;
  fullname: string;
  password: string;

  loading: boolean;
  storeSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.storeSubscription = this.store.select('ui')
      .subscribe((uiState) => this.loading = uiState.isLoading );
  }

  ngOnDestroy() {
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }

  onSubmit(formValue: UserRegisterDto): void {
    this.authService.createUser(formValue);
  }

}
