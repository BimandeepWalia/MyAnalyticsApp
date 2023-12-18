import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupersetComponent } from './components/superset/superset.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [{ path: '', redirectTo: 'navbar', pathMatch: 'full' },
{ path: 'navbar', component: NavbarComponent },
{ path: 'superset', component: SupersetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
