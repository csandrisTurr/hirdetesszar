import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

export class DelayedAction {}

@Injectable({
  providedIn: 'root',
})
export class DelayService {
  public delayPercentage: number;
  @Output() percentageChanged: EventEmitter<number>;

  constructor() {
    this.delayPercentage = 0;
    this.percentageChanged = new EventEmitter();
  }

  public getPercentage(): Observable<number> {
    return of(this.delayPercentage);
  }

  async increase(delay: number) {
    this.delayPercentage++;
    this.percentageChanged.emit(this.delayPercentage);

    if (this.delayPercentage < 100) {
      await new Promise((r) => setTimeout(r, delay));
      await this.increase(delay);
    }
  }

  public async do(action: () => void, delay: number) {
    await this.increase(delay / 100);

    action();
    await new Promise((r) => setTimeout(r, 1000));

    this.delayPercentage = 0;
    this.percentageChanged.emit(this.delayPercentage);
  }
}
