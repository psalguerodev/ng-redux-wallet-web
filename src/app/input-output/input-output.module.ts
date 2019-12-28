import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { InputOutputComponent } from './input-output.component';
import { CountPipe } from './pipes/count.pipe';
import { OrderItemsPipe } from './pipes/order-items.pipe';
import { StatComponent } from './stat/stat.component';
import { StoreModule } from '@ngrx/store';
import { IOReducer } from './input-output.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('io', IOReducer)
  ],
  exports: [],
  declarations: [
    DashboardComponent,
    InputOutputComponent,
    StatComponent,
    DetailComponent,
    CountPipe,
    OrderItemsPipe
  ],
  providers: [],
})
export class InputOutputModule { }
