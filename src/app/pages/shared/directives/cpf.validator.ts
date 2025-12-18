import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

export function validarCPF(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cpf = control.value.replace(/\D/g, '');

    if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) {
      return { cpfError: control.value };
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto < 10 ? resto : 0;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return { cpfError: control.value };
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto < 10 ? resto : 0;
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return { cpfError: control.value };
    }
    return null;
  };
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cpfValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CPFValidatorDirective,
      multi: true,
    },
  ],
})
export class CPFValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return validarCPF()(control);
  }
}
