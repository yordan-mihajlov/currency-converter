import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  test = 'hello'
  constructor(private http: HttpClient) {

  }

  // getData(): Observable<any> {
  //   return this.http.get('https://api.exchangeratesapi.io/latest?base=USD');
  // }
}
