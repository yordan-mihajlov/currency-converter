import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyService, ExchangeRate } from 'src/services/currency.service';
import { TextMaskConfig } from 'angular2-text-mask';
import { createNumberMask } from 'text-mask-addons';
import { take } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent {
  exchangeRate: ExchangeRate;
  currencies: Array<Currency>;
  selectedFromCurrency: Currency;
  selectedToCurrency: Currency;
  value: number = 1;

  get mask(): TextMaskConfig {
    return {
      mask: createNumberMask({
        thousandsSeparatorSymbol: '',
        decimalSymbol: '.',
        decimalLimit: 2,
        integerLimit: null,
        allowDecimal: true,
        prefix: ''
      }),
      // guide: false,
      // placeholderChar: '',
      // keepCharPositions: true
    };
  };

  get result(): number {
    return Number((this.value * this.exchangeRate.rate).toFixed(2));
  }

  get fromCurrencyName(): string {
    return this.selectedFromCurrency ? this.selectedFromCurrency.name.toLowerCase() : 'bgn';
  }

  get toCurrencyName(): string {
    return this.selectedToCurrency ? this.selectedToCurrency.name.toLowerCase() : 'eur';
  }

  constructor(private _currencyService: CurrencyService, private _cdr: ChangeDetectorRef) {
    this._currencyService.getExchangeRateAll(this.fromCurrencyName).pipe(take(1)).subscribe((data: any) => {
      const dataArray = Array.from(Object.entries(data.rates));
      const currArray: Array<Currency> = dataArray
        .map((x: Array<any>) => new Currency(x[0]))
        .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      this.currencies = currArray;

      const bgnCurrency = this.currencies.find(c => c.name.toLowerCase() === 'bgn');
      const eurCurrency = this.currencies.find(c => c.name.toLowerCase() === 'eur');
      this.selectedFromCurrency = bgnCurrency ? bgnCurrency : this.currencies[0];
      this.selectedToCurrency = eurCurrency ? eurCurrency : this.currencies[0];
      this._cdr.detectChanges();
    },
      (error: any) => {
        this.errorHandler(error);
      }
    );

    this._currencyService.getExchangeRateBetween(this.fromCurrencyName, this.toCurrencyName).pipe(take(1)).subscribe(
      (data: any) => {
        this.exchangeRate = data as ExchangeRate;
      },
      (error: any) => {
        this.errorHandler(error);
      }
    );
  }

  getFlagClass(currency: string): string {
    return `currency-flag-${currency.toLowerCase()}`;
  }

  fromSelectionChange(event: MatSelectChange) {
    this._currencyService.getExchangeRateBetween(event.value.name, this.selectedToCurrency.name.toLowerCase()).pipe(take(1)).subscribe(
      (data: any) => {
        this.exchangeRate = data as ExchangeRate;
      },
      (error: any) => {
        this.errorHandler(error);
      }
    );
  }

  toSelectionChange(event: MatSelectChange) {
    this._currencyService.getExchangeRateBetween(this.selectedFromCurrency.name.toLowerCase(), event.value.name).pipe(take(1)).subscribe(
      (data: any) => {
        this.exchangeRate = data as ExchangeRate;
      },
      (error: any) => {
        this.errorHandler(error);
      }

    );
  }

  errorHandler(error): void {
    console.log('ERROR BE BATE');
  }
}

class Currency {
  constructor(public name: string) { }
}
