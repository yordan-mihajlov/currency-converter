import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** ROOT URL for accessing the exchangeratesapi.io API.  */
const ROOT_URL = 'https://api.exchangeratesapi.io';

/**
 * Application-wide singleton service, that can be used to fetch
 * conversion and exchange rate data between two currencies by
 * utilizing the exchangeratesapi.io API.
 */
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) { }

  /**
   * Returns exchange rate information for two specific currencies
   * by specifying from which to which the conversion should be fetched.
   * @param from The input currency for conversion.
   * @param to The output resulting currency.
   */
  getExchangeRateBetween(from: string, to: string): Observable<ExchangeRate> {
    return this.http
      .get(`${ROOT_URL}/latest?base=${from.toUpperCase()}&symbols=${to.toUpperCase()}`)
      .pipe(
        map((obj: any) => {
          return new ExchangeRate(obj.base, to.toUpperCase(), obj.date, obj.rates[to.toUpperCase()]);
        })
      );
  }

  /**
   * Returns exchange rate information from a single currency to all other currencies.
   * @param from The input currency for conversion.
   */
  getExchangeRateAll(from: string): Observable<ExchangeRateAll> {
    return this.http
    .get(`${ROOT_URL}/latest?base=${from.toUpperCase()}`)
    .pipe(
      map((obj: any) => {
        return new ExchangeRateAll(obj.base,obj.date, obj.rates);
      })
    );
  }
}

/**
 * Class for representing an exchange rate between two currencies.
 */
export class ExchangeRate {
  /** We multiply the FROM currency by the TO currency with the RATE. */
  constructor(public from: string, public to: string, public date: string, public rate: any) { }
}

/**
 * Class for representing the exchange rates between a specific currency and all other currencies.
 */
export class ExchangeRateAll {
  constructor(public from: string, public date: string, public rates: Array<any>) { }
}