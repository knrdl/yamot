import { Component, OnInit } from '@angular/core'
import { DataService } from '../../providers/data-service'
import { ServerService } from '../../providers/server-service'

@Component({
  selector: 'page-board',
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardPage implements OnInit {

  constructor(private dataService: DataService, private serverService: ServerService) { }

  ngOnInit(): void {
    this.dataService.loadConfig().subscribe(() => this.serverService.startServerMeasurements())
  }

}
