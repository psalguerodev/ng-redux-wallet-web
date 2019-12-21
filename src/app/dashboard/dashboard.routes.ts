import { Routes } from '@angular/router';
import { DetailComponent } from '../input-output/detail/detail.component';
import { InputOutputComponent } from '../input-output/input-output.component';
import { StatComponent } from '../input-output/stat/stat.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatComponent },
  { path: 'input-output', component: InputOutputComponent },
  { path: 'detail', component: DetailComponent }
];
