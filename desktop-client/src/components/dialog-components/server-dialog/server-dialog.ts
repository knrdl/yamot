import { Component } from '@angular/core'
import { DataService } from '../../../providers/data-service'
import { FormGroup, FormBuilder, FormArray, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { Server } from '../../../model/Server'
import { ServerService } from '../../../providers/server-service'
import { GenericDialog } from '../generic-dialog/generic-dialog'

@Component({
    selector: 'server-dialog',
    templateUrl: 'server-dialog.html',
    styleUrls: ['../generic-dialog/generic-dialog.scss']
})
export class ServerDialog extends GenericDialog {
    private server: Server[]
    private newServer: Server

    private serverForm: FormGroup
    private newServerForm: FormGroup

    constructor(
        private dataService: DataService,
        private serverService: ServerService,
        private formBuilder: FormBuilder
    ) { super() }

    init(): void {
        this.server = this.dataService.server.map(s => Object.assign(new Server(), s, { data: undefined, updateDiff: undefined, online: undefined }))
        this.newServer = new Server()
        this.initServerForm()
        this.newServerForm = this.makeServerEntryControl()
    }

    private initServerForm(): void {
        let arr = []
        for (let i = 0; i < this.server.length; i++)
            arr.push(this.makeServerEntryControl())

        this.serverForm = this.formBuilder.group({
            data: this.formBuilder.array(arr)
        }, {
                validator: this.validateUniqueAlias.bind(this)
            })
    }

    private makeServerEntryControl(): FormGroup {
        return this.formBuilder.group({
            alias: new FormControl('', [Validators.required, this.aliasValidator()]),
            addr: new FormControl('', [Validators.required, this.addrValidator()]),
            port: new FormControl('', [Validators.required, Validators.min(1)]),
            user: new FormControl('', [Validators.required]),
            pw: new FormControl('', [Validators.required]),
        })
    }

    private validateUniqueAlias(group: FormGroup): { duplicatedAlias: boolean } | null {
        let arr = group.value.data.map(s => s.alias).filter(s => s !== "")
        if ((this.server.length == arr.length) && (arr.length != new Set(arr).size)) {
            return { duplicatedAlias: true }
        }
        return null
    }

    private addrValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && [':', '/', '?', '#', '&'].some(chr => control.value.includes(chr))) {
                return { 'Illegal Character in Address': { value: control.value } }
            } else {
                return null
            }
        }
    }

    private aliasValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (control.value && control.value.includes('/')) {
                return { 'Illegal Character in Alias': { value: control.value } }
            } else {
                return null
            }
        }
    }

    private get illegalAddress(): string | null {
        let e1 = (this.serverForm.controls.data as any).controls.find(ctrl => 'Illegal Character in Address' in (ctrl.controls.addr.errors || {}))
        let e2 = 'Illegal Character in Address' in (this.newServerForm.controls.addr.errors || {})
        return (e1 || e2) ? (e1 ? e1.value.addr : this.newServerForm.controls.addr.value) : null
    }

    private get illegalAlias(): string | null {
        let e1 = (this.serverForm.controls.data as any).controls.find(ctrl => 'Illegal Character in Alias' in (ctrl.controls.alias.errors || {}))
        let e2 = 'Illegal Character in Alias' in (this.newServerForm.controls.alias.errors || {})
        return (e1 || e2) ? (e1 ? e1.value.alias : this.newServerForm.controls.alias.value) : null
    }

    close(): void {
        if ((!this.serverForm.dirty && !this.newServerForm.dirty) || ((this.serverForm.dirty || this.newServerForm.dirty) && confirm('Unsaved changes detected, discard?'))) {
            super.close()
        }
    }

    private save(): void {
        if (!this.newServerForm.dirty || (this.newServerForm.dirty && confirm('Unsaved changes detected, discard?'))) {
            this.serverService.updateList(this.server).subscribe(
                () => super.close(),
                () => alert('Error saving changes!')
            )
        }
    }

    private addServer(): void {
        let alreadyInList: boolean = this.server.some(s => s.addr == this.newServer.addr && s.port == this.newServer.port)
        if ((!alreadyInList) || (alreadyInList && confirm('Server is already in list, add anyway?'))) {
            this.server.push(Object.assign(new Server(), this.newServer));
            (<FormArray>this.serverForm.controls.data).push(this.makeServerEntryControl())
            this.newServerForm.reset()
            this.serverForm.markAsDirty()
        }
    }

    //type needs to be passed seperately to the func because the element #pw is not unique
    //it's created inside a ng-template (by ng) on every ngFor interation (avoiding unpredictable behaviour)
    private invertPassword(type: 'password' | 'text'): 'password' | 'text' {
        return type == 'password' ? 'text' : 'password'
    }

    private showPassword(type: 'password' | 'text'): boolean {
        return type == 'text'
    }

    private removeServer(s: Server, index: number): void {
        this.server = this.server.filter(svr => s.alias != svr.alias);
        (<FormArray>this.serverForm.controls.data).removeAt(index)
        this.serverForm.markAsDirty()
    }
}