import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function testInputStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const isOnlyAlphanumeric = /^[A-Za-z0-9 ]+$/.test(value);
    const minLength = value.length >= 3;
    const isInputValid = isOnlyAlphanumeric && minLength;

    return !isInputValid ? { inputStrength: true } : null;
  };
}
