import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Currency, RatedCurrency } from '../app/currency';
import { CurrencyService } from 'src/services/currency.service';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-currency-exchange-rate',
  templateUrl: './currency-exchange-rate.component.html',
  styleUrls: ['./currency-exchange-rate.component.scss']
})
export class CurrencyExchangeRateComponent implements OnInit {
  currencies: Array<Currency>;
  ratedCurrencies: Array<RatedCurrency>;
  selectedFromCurrency: Currency;

  // Error members
  hasError = false;
  errorMessage = '';

  get fromCurrencyName(): string {
    return this.selectedFromCurrency ? this.selectedFromCurrency.name.toLowerCase() : 'bgn';
  }

  constructor(private _currencyService: CurrencyService, private _cdr: ChangeDetectorRef) {
    this._currencyService.getExchangeRateAll(this.fromCurrencyName).pipe(take(1)).subscribe(
      (data: any) => {
        this.hasError = false;

        const dataArray = Array.from(Object.entries(data.rates));
        const currArray: Array<Currency> = dataArray
          .map((x: Array<any>) => new Currency(x[0]))
          .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.currencies = currArray;

        const bgnCurrency = this.currencies.find(c => c.name.toLowerCase() === 'bgn');
        this.selectedFromCurrency = bgnCurrency ? bgnCurrency : this.currencies[0];
        this._cdr.detectChanges();
    },
      (error: HttpErrorResponse) => {
        this.errorHandler(error);
      }
    );
  }

  ngOnInit(): void {
    /** Initial request to fetch and update the view. */
    this.refresRatedCurrencies();
  }

  fromSelectionChange(event: MatSelectChange) {
    /** Make a new request to fetch and update the view based on the new 'from' currency. */
    this.refresRatedCurrencies();
  }

  /** Method that returns the CSS class of the respective flag in order to render it. */
  getFlagClass(currency: string): string {
    return `currency-flag-${currency.toLowerCase()}`;
  }

  private refresRatedCurrencies(): void {
    this._currencyService.getExchangeRateAll(this.fromCurrencyName).pipe(take(1)).subscribe(
      (data: any) => {
        this.hasError = false;

        const dataArray = Array.from(Object.entries(data.rates));
        const currArray: Array<RatedCurrency> = dataArray
          .map((x: Array<any>) => new RatedCurrency(x[0], x[1]))
          .sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.ratedCurrencies = currArray;
    },
      (error: HttpErrorResponse) => {
        this.errorHandler(error);
      }
    );
  }

  /**
   * Handler for displaying an error with respective message when the request has failed.
   */
  private errorHandler(error: HttpErrorResponse): void {
    this.hasError = true;
    this.errorMessage = error.message;
  }
}
