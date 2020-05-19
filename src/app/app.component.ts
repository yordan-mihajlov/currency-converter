import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private _destroyed: Subject<void> = new Subject<void>();

  title: string;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      takeUntil(this._destroyed)
    ).subscribe((event: any) => {
      if (event.snapshot && event.snapshot.data && event.snapshot.data.title) {
        this.title = event.snapshot.data.title;
      }
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
