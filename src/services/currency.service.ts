import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ROOT_URL = 'https://api.exchangeratesapi.io';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) { }

  getExchangeRateBetween(from: string, to: string): Observable<ExchangeRate> {
    return this.http
      .get(`${ROOT_URL}/latest?base=${from.toUpperCase()}&symbols=${to.toUpperCase()}`)
      .pipe(
        map((obj: any) => {
          return new ExchangeRate(obj.base, to.toUpperCase(), obj.date, obj.rates[to.toUpperCase()]);
        })
      );
  }

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


class ExchangeRate {
  /** We multiply the FROM currency by the TO currency with the RATE. */
  constructor(public from: string, public to: string, public date: string, public rate: any) { }
}

class ExchangeRateAll {
  constructor(public from: string, public date: string, public rates: Array<any>) { }
}