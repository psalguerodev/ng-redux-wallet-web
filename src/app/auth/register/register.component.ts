import { Component, OnInit } from '@angular/core';
import { AuthService, UserRegisterDto } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'psalguerodev-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  email: string;
  fullname: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(formValue: UserRegisterDto): void {
    this.authService.createUser(formValue);
  }


}
