import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive } from '@angular/core';

export function validarCNPJ(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cnpj = control.value.replace(/\D/g, '');

    if (cnpj.toString().length != 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return { cnpjError: control.value };
    }

    let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso[i];
    }
    let resto = soma % 11;
    let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;
    if (digitoVerificador1 !== parseInt(cnpj.charAt(12))) {
      return { cnpjError: control.value };
    }

    peso.unshift(6);
    soma = 0;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso[i];
    }
    resto = soma % 11;
    let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
    if (digitoVerificador2 !== parseInt(cnpj.charAt(13))) {
      return { cnpjError: control.value };
    }

    return null;
  };
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[cnpjValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CNPJValidatorDirective,
      multi: true,
    },
  ],
})
export class CNPJValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return validarCNPJ()(control);
  }
}
