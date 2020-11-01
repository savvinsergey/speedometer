import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {state, style, trigger} from '@angular/animations';
import {BehaviorSubject} from 'rxjs';
import {SpeedometerData, SpeedometerService} from './speedometer.service';


@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SpeedometerService],
  /*There is second variant with ngStyle. You can find it in the template*/
  animations: [
    trigger('speedState', [
      state('default', style({ transform: 'rotate({{degrees}}deg)' }), {params: {degrees: '-120'}}),
    ]),
    trigger('colorState', [
      state('green', style({ backgroundColor: 'green' })),
      state('orange', style({ backgroundColor: 'orange' })),
      state('red', style({ backgroundColor: 'red' }))
    ])
  ]
})
export class SpeedometerComponent implements OnInit, OnDestroy {
  @Input() interval = 4000;
  readonly data$: BehaviorSubject<SpeedometerData> = this.speedometerService.data$;

  private intervalId: number;

  constructor(private speedometerService: SpeedometerService) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() =>
      this.speedometerService.updateSpeed(), this.interval);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
