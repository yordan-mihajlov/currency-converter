import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyService } from 'src/services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  currencies: Array<Currency>;
  selectedFromCurrency: Currency;
  selectedToCurrency: Currency;

  getFlagClass(currency: string): string {
    return `currency-flag-${currency.toLowerCase()}`;
  }

  constructor(private _currencyService: CurrencyService, private _cdr: ChangeDetectorRef) {
    this._currencyService.getExchangeRateAll('usd').subscribe((data: any) => {
      const dataArray = Array.from(Object.entries(data.rates));
      const currArray: Array<Currency> = dataArray.map((x: Array<any>) => new Currency(x[0]));
      this.currencies = currArray;

      const bgnCurrency = this.currencies.find(c => c.name.toLowerCase() === 'bgn');
      this.selectedFromCurrency = bgnCurrency ? bgnCurrency : this.currencies[0];
      this._cdr.detectChanges();
    });

    this._currencyService.getExchangeRateBetween('cad', 'eur').subscribe((data: any) => {
      // console.log(data);
    });
  }

}

class Currency {
  constructor(public name: string) { }
}
