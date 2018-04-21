import { Component, Input } from '@angular/core'
import { Server } from '../../../model/Server'
import { GenericDialog } from '../generic-dialog/generic-dialog'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { ServerService } from '../../../providers/server-service'

@Component({
    selector: 'serversettings-dialog',
    templateUrl: 'serversettings-dialog.html',
    styleUrls: ['../generic-dialog/generic-dialog.scss']
})
export class ServerSettingsDialog extends GenericDialog {

    @Input() server: Server

    private powerForm: FormGroup

    constructor(private formBuilder: FormBuilder, private serverService: ServerService, ) { super() }

    init(): void {
        this.powerForm = this.formBuilder.group({
            powerSupply: new FormControl(this.server.powerSupply, [Validators.min(0)]),
            averageCurrent: new FormControl(this.server.averageCurrent, [Validators.min(0)]),
        })
    }

    close(): void {
        if (
            !this.powerForm.dirty || (
                ((this.powerForm.value.powerSupply != this.server.powerSupply) || (this.powerForm.value.averageCurrent != this.server.averageCurrent))
                && confirm('Unsaved changes detected, discard?')
            )
        ) {
            super.close()
        }
    }

    private save(): void {
        this.serverService.updatePowerData(this.server, this.powerForm.value).subscribe(
            () => super.close(),
            () => alert('Error saving data')
        )

    }

}