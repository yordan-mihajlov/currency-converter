import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyCoverterRoutingModule } from './currency-converter-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [
    CommonModule,
    CurrencyCoverterRoutingModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
  ]
})
export class CurrencyConverterModule { }
