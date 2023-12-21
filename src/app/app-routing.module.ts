import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ExtraOptions, RouterModule } from "@angular/router";


export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import("./pages/dashboard/dashboard.module").then((m)=> m.DashboardModule)
  },
  {
    path: 'products',
    loadChildren: () => import("./pages/products/products.module").then((m)=> m.ProductsModule)
  },

  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "**", redirectTo: "dashboard" },
]

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
