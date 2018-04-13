import { Component } from '@angular/core'
import { DataService } from '../../providers/data-service'

@Component({
  selector: 'page-board',
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardPage {

  constructor(private dataService: DataService, ) { }

}
