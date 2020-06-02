import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyExchangeRateComponent } from './currency-exchange-rate.component';
import { CurrencyExchangeRateRoutingModule } from './currency-exchange-rate-routing.module';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [CurrencyExchangeRateComponent],
  imports: [
    CommonModule,
    CurrencyExchangeRateRoutingModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule
  ]
})
export class CurrencyExchangeRateModule { }
