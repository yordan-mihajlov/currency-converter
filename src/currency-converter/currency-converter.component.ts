import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CurrencyService, ExchangeRate } from 'src/services/currency.service';
import { TextMaskConfig } from 'angular2-text-mask';
import { createNumberMask } from 'text-mask-addons';
import { take } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { HttpErrorResponse } from '@angular/common/http';
import { Currency } from '../app/currency';

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

  // Error members
  hasError = false;
  errorMessage = '';

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
    this._currencyService.getExchangeRateAll(this.fromCurrencyName).pipe(take(1)).subscribe(
      (data: any) => {
        this.hasError = false;

        /** Fetch all currencies data. */
        const dataArray = Array.from(Object.entries(data.rates));
        /**
         * Parse currencies data by extracting only the currency name.
         * Each element of dataArray is a two-element heterogeneous array [<currency_name>, <currency_exchange_rate>].
         */
        const currArray: Array<Currency> = dataArray
          .map((x: Array<any>) => new Currency(x[0]))
          .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.currencies = currArray;

        /** Set default 'from' and 'to' currencies. */
        const bgnCurrency = this.currencies.find(c => c.name.toLowerCase() === 'bgn');
        const eurCurrency = this.currencies.find(c => c.name.toLowerCase() === 'eur');
        this.selectedFromCurrency = bgnCurrency ? bgnCurrency : this.currencies[0];
        this.selectedToCurrency = eurCurrency ? eurCurrency : this.currencies[0];
        this._cdr.detectChanges();
    },
      (error: HttpErrorResponse) => {
        this.errorHandler(error);
      }
    );

    /** Initial request to fetch data and update the view. */
    this._currencyService.getExchangeRateBetween(this.fromCurrencyName, this.toCurrencyName).pipe(take(1)).subscribe(
      (data: any) => { this.successExchangeRateBetween(data); },
      (error: HttpErrorResponse) => { this.errorHandler(error); }
    );
  }

  /** Method that returns the CSS class of the respective flag in order to render it. */
  getFlagClass(currency: string): string {
    return `currency-flag-${currency.toLowerCase()}`;
  }

  fromSelectionChange(event: MatSelectChange) {
    /** Make a new request to fetch and update the view based on the new 'from' currency. */
    this._currencyService.getExchangeRateBetween(event.value.name, this.selectedToCurrency.name.toLowerCase()).pipe(take(1)).subscribe(
      (data: any) => { this.successExchangeRateBetween(data); },
      (error: HttpErrorResponse) => { this.errorHandler(error); }
    );
  }

  toSelectionChange(event: MatSelectChange) {
    /** Make a new request to fetch and update the view based on the new 'to' currency. */
    this._currencyService.getExchangeRateBetween(this.selectedFromCurrency.name.toLowerCase(), event.value.name).pipe(take(1)).subscribe(
      (data: any) => { this.successExchangeRateBetween(data); },
      (error: HttpErrorResponse) => { this.errorHandler(error); }
    );
  }

  /**
   * Updates the current exchangeRate in the view based on the provided argument.
   */
  private successExchangeRateBetween(data: ExchangeRate): void {
    this.hasError = false;
    this.exchangeRate = data;
  }

  /**
   * Handler for displaying an error with respective message when the request has failed.
   */
  private errorHandler(error: HttpErrorResponse): void {
    this.hasError = true;
    this.errorMessage = error.message;
  }
}

