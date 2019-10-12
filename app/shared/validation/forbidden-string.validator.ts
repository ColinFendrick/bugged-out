import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenStringValidator(strList: RegExp[]):ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const str = control.value;
    const invalid = strList.some(rx => rx.test(str));
    return invalid ? { 'forbiddenString': { str }} : null;
  }
}
