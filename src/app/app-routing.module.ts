import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { HomeComponent } from './home/home.component';
import { PizzasComponent } from './pizzas/pizzas.component';

const routes: Routes = [

{
  component:HomeComponent,
  path: ''
},
{
  component:AboutComponent,
  path: 'about'
},
{
  component:PizzasComponent,
  path: 'pizzas'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
