import { NgModule, inject } from '@angular/core';
import { AppComponent } from "./app.component";
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InitComponent } from './components/init/init.component';
import { HomeComponent } from './components/home/home.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { InfoComponent } from './components/user-info/user-info.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { Router } from '@angular/router';
import { InsertMatchComponent } from './components/insert-match/insert-match.component';
import { InsertResultComponent } from './components/insert-result/insert-result.component';
import { TermsComponent } from './components/terms/terms.component';

//verifica que este logueado sino redirige a login
const authGuard: CanActivateFn = (route, state) => {
  const login = localStorage.getItem('userId');
  const router = inject(Router);
  if (login) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

//Verifica que sea admin sino redirige a home
const adminGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId');
  const router = inject(Router);
  if (userId == '54332111') {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};



export const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: '', component: InitComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'ranking', component: RankingComponent, canActivate: [authGuard] },
  { path: 'info', component: InfoComponent, canActivate: [authGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [authGuard] },
  { path: 'insertMatch', component: InsertMatchComponent, },
  { path: 'insertResult', component: InsertResultComponent, },
  { path: 'terms', component: TermsComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
