import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../model/user.model';

export interface UserRegisterDto {
  id?: string;
  password?: string;
  email: string;
  fullname: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private authFire: AngularFireAuth) { }

  initAuthentication(): void {
    this.authFire.authState.subscribe((user: firebase.User) => {
      console.log('user state :: ', user);
    });
  }

  createUser(user: UserRegisterDto): void {
    this.authFire
      .auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
        const userDocument: User = {
          fullaname: user.fullname,
          uid: userCredential.user.uid,
          email: userCredential.user.email
        };

        this.firestore.doc(`${userDocument.uid}/user`).set(userDocument);
        this.goToRoute('dashboard');

      })
      .catch((error: any) => this.handlerError(error.message || 'Error'));
  }

  login(user: UserLoginDto): void {
    this.authFire.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((userCredentials: firebase.auth.UserCredential) => {
        this.user = userCredentials.user;
        this.goToRoute('dashboard');
      })
      .catch(error => this.handlerError(error.message || 'Error'));
  }

  private goToRoute(...route: string[]): void {
    this.router.navigate( route );
  }

  private handlerError(error: string) {
    console.log(error);
    Swal.fire('Ocurrió un error', error, 'error')
  }

  logout() {
    this.goToRoute('login');
    this.authFire.auth.signOut();
  }

  isAuthenticate(): Observable<boolean> {
    return this.authFire.authState
      .pipe(
        map((userCredentials: firebase.User) => {
          const user = (userCredentials != null);
          if ( !user ) this.goToRoute('login');
          return user;
        })
      );
  }
}
