import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {testInputStrengthValidator} from '../validators/search-input-strength.validator';


@Directive({
    selector: "[inputStrength]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: InputStrengthDirective,
        multi: true
    }]
})

export class InputStrengthDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        return testInputStrengthValidator()(control);
    }

}