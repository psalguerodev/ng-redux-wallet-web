import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { InputOutput } from '../model/input-output.model';
import { Subscription } from 'rxjs';
import { DataChart } from './model/chart.model';
import { IOState } from '../input-output.reducer';
import { CountPipe } from '../pipes/count.pipe';

@Component({
  selector: 'psalguerodev-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit, OnDestroy {

  items: InputOutput[] = [];
  itemsSubscription: Subscription;

  // Graphic config
  // Options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Montos';
  showYAxisLabel = true;
  yAxisLabel = 'Tipos';
  colorScheme = 'ocean';

  results: DataChart[] = [];
  countPipe: CountPipe  = new CountPipe();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('io')
      .subscribe(ioState => this.handleIoState(ioState));
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

  handleIoState(ioState: IOState): void {
    this.items = ioState.items;
    const inputs: DataChart = {
      name: 'Entrada',
      value: this.countPipe.transform(this.items, 'input', false)
    };
    const outputs: DataChart = {
      name: 'Salida',
      value: this.countPipe.transform(this.items, 'output', false)
    };
    this.results = [inputs, outputs];
  }

}
