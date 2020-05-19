import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyCoverterRoutingModule } from './currency-converter-routing.module';



@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [
    CommonModule,
    CurrencyCoverterRoutingModule
  ]
})
export class CurrencyConverterModule { }
