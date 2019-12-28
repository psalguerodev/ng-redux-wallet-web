import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/model/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'psalguerodev-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  fullname: string;
  userSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('auth')
      .pipe(filter( authState => authState.user != null))
      .subscribe((authState) => this.fullname = authState.user.fullname);
  }

  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

}
