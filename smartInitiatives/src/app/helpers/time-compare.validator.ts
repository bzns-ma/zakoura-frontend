
import { FormGroup, ValidatorFn } from '@angular/forms';

export function startTimeIsBEforeEndTime(start: string, end: string) {
    return (formGroup: FormGroup) => {
        const start_time_control = formGroup.controls[start];//formGroup.get('start_time');
        const end_time_control = formGroup.controls[end];//formGroup.get('end_time');
        if (!start_time_control || !end_time_control) {
            return null;
        }
        if (end_time_control.errors && !end_time_control.errors.comparetime) {
            // return if another validator has already found an error
            return;
        }

        // set error on matchingControl if validation fails

        return start_time_control.value !== null && end_time_control.value !== null && start_time_control.value < end_time_control.value ? end_time_control.setErrors(null) : end_time_control.setErrors({ comparetime: true });

    };
}
