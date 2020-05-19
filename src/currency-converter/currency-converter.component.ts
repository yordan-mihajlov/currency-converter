import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/services/currency.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  test: string;

  constructor(private _currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    this.test = this._currencyService.test;

    this._currencyService.getData().subscribe((data: any) => {
      console.log(data);
      const bar = Array.from(Object.entries(data.rates));
      const mapche = new Map(bar);
      console.log(new Map(bar));
    });
  }
}
