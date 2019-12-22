import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserLoginDto } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'psalguerodev-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: string;
  password: string;

  loading: boolean;
  storeSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.storeSubscription = this.store
      .select('ui').subscribe(state => this.loading = state.isLoading);
  }

  ngOnDestroy() {
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }

  login(userLogin: UserLoginDto) {
    this.authService.login(userLogin);
  }

}
