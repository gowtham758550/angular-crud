import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  {path: '', component: TableComponent},
  {path: 'product/:id', component: ViewProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
