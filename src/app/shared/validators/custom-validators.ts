import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function futureDateValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        const selectedDate = moment(control.value);
        const currentDate = moment().startOf('day');
        return selectedDate.isSameOrBefore(currentDate) ? { notFutureDate: true } : null;
    }
}