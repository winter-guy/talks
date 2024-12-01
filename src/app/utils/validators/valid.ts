/* eslint-disable */
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export function maxLengthValidator(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const value: string = control.value;
            if (value && value.length > 400) {
                resolve({ maxLengthExceeded: true });
            } else {
                resolve(null);
            }
        }, 200); // Simulating an asynchronous operation with setTimeout
    });
}
