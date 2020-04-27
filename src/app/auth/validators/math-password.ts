import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MathPassword implements Validator {
  validate(control: FormGroup) {
    const { password, passwordConfirmation } = control.value;
    if (password === passwordConfirmation) {
      return null;
    }
    return { passwordsDontMatch: true };
  }
}
