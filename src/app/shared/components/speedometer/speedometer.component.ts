import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {state, style, trigger} from '@angular/animations';
import {BehaviorSubject, interval} from 'rxjs';
import {SpeedometerData, SpeedometerService} from './speedometer.service';
import {Subscription} from 'rxjs/internal/Subscription';


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
  @Input()
  readonly interval = 4000;
  readonly data$: BehaviorSubject<SpeedometerData> = this.speedometerService.data$;

  private subscription: Subscription;

  constructor(private speedometerService: SpeedometerService) { }

  ngOnInit(): void {
    this.subscription = interval(this.interval)
      .subscribe(() => this.speedometerService.updateSpeed());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
