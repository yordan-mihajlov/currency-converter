import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyExchangeRateComponent } from './currency-exchange-rate.component';


const routes: Routes = [
  { path: '', component: CurrencyExchangeRateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyExchangeRateRoutingModule { }
