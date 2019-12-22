import { Component, OnInit } from '@angular/core';
import { AuthService, UserLoginDto } from '../services/auth.service';

@Component({
  selector: 'psalguerodev-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(userLogin: UserLoginDto) {
    this.authService.login(userLogin);
  }

}
