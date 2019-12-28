import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
})
export class AuthModule { }
