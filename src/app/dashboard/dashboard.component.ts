import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputOutputService } from '../input-output/services/input-output.service';

@Component({
  selector: 'psalguerodev-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private ioService: InputOutputService,
  ) { }

  ngOnInit() {
    this.ioService.initInputOutputListener();
  }

  ngOnDestroy() {
  }

}
