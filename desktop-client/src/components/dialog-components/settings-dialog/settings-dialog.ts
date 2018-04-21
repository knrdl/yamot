import { Component } from '@angular/core'
import { DataService } from '../../../providers/data-service'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { GenericDialog } from '../generic-dialog/generic-dialog'
import { SettingsService } from '../../../providers/settings-service'

@Component({
    selector: 'settings-dialog',
    templateUrl: 'settings-dialog.html',
    styleUrls: ['../generic-dialog/generic-dialog.scss']
})
export class SettingsDialog extends GenericDialog {

    private settingsForm: FormGroup

    constructor(
        private dataService: DataService,
        private settingsService: SettingsService,
        private formBuilder: FormBuilder
    ) { super() }

    private save(): void {
        this.settingsForm.value.sizeFactor = parseInt(this.settingsForm.value.sizeFactor)
        this.settingsForm.value.speedFactor = parseInt(this.settingsForm.value.speedFactor)
        this.settingsService.updateSettings(this.settingsForm.value).subscribe(
            () => super.close(),
            () => alert('Error saving changes')
        )
    }

    init(): void {
        this.settingsForm = this.formBuilder.group({
            sizeFactor: new FormControl(this.dataService.settings.sizeFactor, [Validators.required]),
            speedFactor: new FormControl(this.dataService.settings.speedFactor, [Validators.required]),
            windowUpdates: new FormControl(this.dataService.settings.windowUpdates, [Validators.required]),
            updateInterval: new FormControl(this.dataService.settings.updateInterval, [Validators.required, Validators.min(1)]),
            kWhPrice: new FormControl(this.dataService.settings.kWhPrice, [Validators.required, Validators.min(0.0)]),
        })
    }

    close(): void {
        let changes: boolean = Object.keys(this.settingsForm.value).some(k => this.settingsForm.value[k] !== this.dataService.settings[k])
        if ((!changes) || (changes && confirm('Unsaved changes detected, discard?'))) {
            super.close()
        }
    }

}