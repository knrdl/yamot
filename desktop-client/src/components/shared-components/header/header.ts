import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from '../../../providers/data-service'

@Component({
    selector: 'header',
    templateUrl: 'header.html',
    styleUrls: ['./header.scss']
})
export class Header {
    private showServerDialog: boolean = false
    private showSettingsDialog: boolean = false
    private showAuthDialog: boolean = false

    constructor(private dataService: DataService, private router: Router, ) { }

    private toggle(): void {
        switch (this.router.url) {
            case '/board': this.router.navigate(['/charts']); break
            case '/charts': this.router.navigate(['/board']); break
        }
    }

    private showAllServer(): void {
        Object.keys(this.dataService.serverVisible).forEach(alias => this.dataService.serverVisible[alias] = true)
    }

    private get hiddenServer(): boolean {
        return Object.keys(this.dataService.serverVisible).some(alias => !this.dataService.serverVisible[alias])
    }

    private get toggleTitle(): string {
        switch (this.router.url) {
            case '/board':
                return 'Go To Charts'
            case '/charts':
                return 'Go To Board'
            default:
                return ''
        }
    }

}