import { NgModule } from '@angular/core';
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InitComponent } from './components/init/init.component';
import { HomeComponent } from './components/home/home.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: '', component: InitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'info', component: UserInfoComponent },
  { path: 'statistics', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
