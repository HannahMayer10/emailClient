import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface CredentialsInput {
  username: string;
  password: string;
  passwordconfirmation: string;
}
interface SignInInput {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(
      // this.rooturl + '/auth/username',
      `${this.rootUrl}/auth/username`,
      {
        username: username,
      }
    );
  }

  signup(credentials: CredentialsInput) {
    return this.http
      .post<SignupResponse>(this.rootUrl + '/auth/signup', credentials, {
        // withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkSignedIn() {
    return this.http
      .get<SignedinResponse>(`${this.rootUrl}/auth/signedin`, {
        // withCredentials: true,
      })
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: SignInInput) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }
}
