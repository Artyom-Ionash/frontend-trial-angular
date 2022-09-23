import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatorComponent } from './components/navigator/navigator.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'navigator',
    pathMatch: 'full',
  },
  {
    path: 'navigator',
    component: NavigatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
