import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    console.log('Validator de Data');
    const value = control.value;
    console.log(value);
    if (value && value.trim().length > 0) {
      // Check if the value matches the yyyy-mm-dd format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        return { invalidDate: true };
      }
    }
    return null;
  };
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dateValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateValidatorDirective,
      multi: true,
    },
  ],
})
export class DateValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return dateValidator()(control);
  }
}
