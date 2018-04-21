import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ChartsPage } from '../pages/charts/charts'
import { BoardPage } from '../pages/board/board'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    component: BoardPage,
  },
  {
    path: 'charts',
    component: ChartsPage,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
