import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyConverterComponent } from './currency-converter.component';


const routes: Routes = [
  {
    path: '',
    component: CurrencyConverterComponent,
    data: { title: 'Currency converter' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyCoverterRoutingModule { }
