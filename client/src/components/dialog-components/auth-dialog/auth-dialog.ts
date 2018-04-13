import { Component } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms'
import { GenericDialog } from '../generic-dialog/generic-dialog'
import { AuthService } from '../../../providers/auth-service'
import { CredentialsChange } from '../../../model/Credentials'

@Component({
    selector: 'auth-dialog',
    templateUrl: 'auth-dialog.html',
    styleUrls: ['../generic-dialog/generic-dialog.scss']
})
export class AuthDialog extends GenericDialog {

    private credForm: FormGroup

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder
    ) {
        super()
    }

    private newPwEqualValidator(group: FormGroup) {
        if (
            group.controls.newPassword1.value !== group.controls.newPassword2.value &&
            group.controls.newPassword1.value.length >= 6 &&
            group.controls.newPassword2.value.length >= 6
        )
            return { newPwNotEquivalent: true }

    }

    private save(): void {
        let result: CredentialsChange = Object.assign(
            new CredentialsChange(),
            this.credForm.value,
            { newPassword: this.credForm.controls.newPassword1.value, newPassword1: undefined, newPassword2: undefined }
        )
        this.authService.changeCredentials(result).subscribe(
            () => this.close(),
            () => alert('Could not change credentials, please check your inputs!')
        )
    }

    //fixme: old-username/pw challenge is pretty useless because of plain login data in session storage => token based auth (jwt)
    init(): void {
        this.credForm = this.formBuilder.group({
            oldUsername: new FormControl('', [Validators.required]),
            oldPassword: new FormControl('', [Validators.required]),
            newUsername: new FormControl('', [Validators.required, this.usernameValidator()]),
            newPassword1: new FormControl('', [Validators.required, Validators.minLength(6)]),
            newPassword2: new FormControl('', [Validators.required, Validators.minLength(6)]),
        }, { validator: this.newPwEqualValidator.bind(this) })
    }

    private usernameValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && control.value.includes(':')) {
                return { 'colon': true }
            } else {
                return null
            }
        }
    }

}