import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { MathPassword } from '../validators/math-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.mathPassword.validate] }
  );

  constructor(
    private mathPassword: MathPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showError() {
    return (
      this.authForm.get('password').touched &&
      this.authForm.get('passwordConfirmation').touched &&
      this.authForm.errors
    );
  }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signup(this.authForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox')
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        }
        this.authForm.setErrors({ unknownError: true });
      },
    });
  }
}
