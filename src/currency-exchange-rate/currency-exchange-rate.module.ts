import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyExchangeRateComponent } from './currency-exchange-rate.component';
import { CurrencyExchangeRateRoutingModule } from './currency-exchange-rate-routing.module';



@NgModule({
  declarations: [CurrencyExchangeRateComponent],
  imports: [
    CommonModule,
    CurrencyExchangeRateRoutingModule
  ]
})
export class CurrencyExchangeRateModule { }
