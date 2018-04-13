import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ChartsPage } from '../pages/charts/charts'
import { BoardPage } from '../pages/board/board'
import { LoginPage } from '../pages/login/login'
import { AuthGuardService } from '../providers/authguard-service'

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'board',
    component: BoardPage,
    canActivate: [AuthGuardService]
  },
  {
    path: 'charts',
    component: ChartsPage,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
