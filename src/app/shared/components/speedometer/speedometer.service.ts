import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export type Colors = 'green' | 'orange'| 'red';

export interface SpeedometerData {
  color: Colors;
  degrees: number;
}

@Injectable()
export class SpeedometerService {
  readonly data$: BehaviorSubject<SpeedometerData> = new BehaviorSubject<SpeedometerData>({
    color: null,
    degrees: null
  });

  private readonly defaultMaxSpeed = 180;
  private readonly defaultDegreesAmount = 240;
  private readonly colorsIntervals = {
    green: {min: 0, max: 60},
    orange: {min: 61, max: 120},
    red: {min: 121, max: 180}
  };

  updateSpeed(): void {
    const speed = this.generateSpeed();

    this.data$.next({
      degrees: this.convertSpeedToDegrees(speed),
      color: this.getColor(speed)
    });
  }

  private generateSpeed(): number {
    return Math.floor(Math.random() * Math.floor(this.defaultMaxSpeed));
  }

  private convertSpeedToDegrees(speed: number): number {
    return (speed / (this.defaultMaxSpeed / this.defaultDegreesAmount)) - (this.defaultDegreesAmount / 2);
  }

  private getColor(speed: number): Colors {
    switch (true) {
      case this.numberBetween(speed, this.colorsIntervals.green):
        return 'green';
      case this.numberBetween(speed, this.colorsIntervals.orange):
        return 'orange';
      case this.numberBetween(speed, this.colorsIntervals.red):
        return 'red';
    }
  }

  private numberBetween(value: number, interval: {min: number, max: number}): boolean {
    return value >= interval.min && value <= interval.max;
  }
}
