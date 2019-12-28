import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/model/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { map, filter } from 'rxjs/operators';
import { InputOutputService } from '../../input-output/services/input-output.service';

@Component({
  selector: 'psalguerodev-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  fullname: string;
  userSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private ioService: InputOutputService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.store.select('auth')
      .pipe(filter( authState => authState.user != null))
      .subscribe(authState => this.fullname = authState.user.fullname);
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  logout() {
    this.ioService.unsubscribeItems();
    this.authService.logout();
  }

}
