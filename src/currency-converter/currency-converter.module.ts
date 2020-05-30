import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './currency-converter.component';
import { CurrencyCoverterRoutingModule } from './currency-converter-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [
    CommonModule,
    CurrencyCoverterRoutingModule,
    TextMaskModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule
  ]
})
export class CurrencyConverterModule { }
