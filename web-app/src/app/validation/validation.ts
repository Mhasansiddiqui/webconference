
import {AbstractControl} from '@angular/forms'

export const passwordMatcher = (control: AbstractControl): {[key: string]: boolean} => {
    const email = control.get('password');
    const confirm = control.get('confirmpassword');
    if (!email || !confirm) {
      return null;
    }
    return email.value === confirm.value ? null : { nomatch: true };
  };