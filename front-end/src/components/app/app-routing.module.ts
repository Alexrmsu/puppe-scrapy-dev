import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {LoginComponent} from "../login/login.component";
import {ScraperComponent} from "../scraper/scraper.component";
import {ScraperDetailsComponent} from "../scraper-details/scraper-details.component";

const routes: Routes = [
  {path: 'ui/dashboard', component: DashboardComponent},
  {path: 'ui/scrapers', component: ScraperComponent},
  {path: 'ui/scrapers/:id', component: ScraperDetailsComponent},
  {path: 'ui/login', component: LoginComponent},
  {path: '**', redirectTo: 'ui/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
