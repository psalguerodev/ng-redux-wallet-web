import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {}

  log(name: string = '', ...args: any): void {
    if (!environment.production) {
      console.log(name, args);
    }
  }
}
