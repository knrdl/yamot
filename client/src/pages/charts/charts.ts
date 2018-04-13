import { Component } from '@angular/core'
import { ChartType } from '../../components/division-components/chart-type-division/chart-type-division'

@Component({
  selector: 'page-charts',
  templateUrl: './charts.html',
  styleUrls: ['./charts.scss']
})
export class ChartsPage {

  constructor() { }

  private chartType: ChartType = 'bar'

}
