import { AsyncValidator, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map((value) => {
        // if (value.available) {
        //   return null;
        // } -- because Error skips the map function so check is useless
        return null;
      }),
      catchError((err) => {
        // otherwise will be thrown at every error
        if (err.error.username) {
          return of({ nonUniqueUsername: true }); //same as new Observable
        } else {
          return of({ NoConnection: true }); //same as new Observable
        }
      })
    );
  };
}
