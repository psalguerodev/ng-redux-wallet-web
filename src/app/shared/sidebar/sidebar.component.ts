import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/model/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'psalguerodev-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User;
  userSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.store.select('auth')
      .subscribe(userState => this.user = userState.user);
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
