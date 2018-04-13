import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from "@angular/router"
import { AuthService } from '../../providers/auth-service'
import { Credentials } from '../../model/Credentials'

type LoginStatus = 'FAILED' | 'PROCESSING' | 'DEFAULT'

@Component({
    templateUrl: 'login.html',
    styleUrls: ['login.scss']
})
export class LoginPage implements OnInit, AfterViewInit {

    private loginForm: FormGroup
    private loginStatus: LoginStatus = 'DEFAULT'

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private renderer2: Renderer2
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.authService.readCredentials().subscribe(
            (cred: Credentials) => {
                this.loginForm.controls['username'].setValue(cred.username)
                this.loginForm.controls['password'].setValue(cred.password)
                this.login(cred, true)
            },
            () => {
                this.focus()
            }
        )
    }

    ngAfterViewInit(): void {
        this.focus()
    }

    private focus(): void {
        this.renderer2.selectRootElement('#loginUsername').focus()
    }

    private submit(): void {
        this.login(new Credentials(this.loginForm.value.username, this.loginForm.value.password))
    }

    private login(cred: Credentials, hideLoginError: boolean = false) {
        this.loginStatus = 'PROCESSING'
        this.loginForm.disable()
        this.authService.login(cred).subscribe(
            () => {
                this.loginForm.reset()
                this.router.navigate(['board']).then(() => {
                    this.loginStatus = 'DEFAULT'
                })
            },
            () => {
                this.loginStatus = hideLoginError ? 'DEFAULT' : 'FAILED'
                this.loginForm.reset()
                this.loginForm.enable()
                this.focus()
            }
        )
    }

}
