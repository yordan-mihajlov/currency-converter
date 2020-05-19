import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'currency-converter',
    loadChildren: () => import('../currency-converter/currency-converter.module').then(m => m.CurrencyConverterModule)
  },
  {
    path: 'currency-exchange-rate',
    loadChildren: () => import('../currency-exchange-rate/currency-exchange-rate.module').then(m => m.CurrencyExchangeRateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
