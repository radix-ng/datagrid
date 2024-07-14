import { Route } from '@angular/router';

import { BaseComponent } from './base/base.component';
import { ColumnOrderingComponent } from './column-ordering/column-ordering.component';
import { FiltersComponent } from './filters/filters.component';
import { RowSelectionComponent } from './row-selection/row-selection.component';

export const appRoutes: Route[] = [
    { path: '', component: BaseComponent },
    { path: 'base', component: BaseComponent },
    { path: 'column-ordering', component: ColumnOrderingComponent },
    { path: 'row-selection', component: RowSelectionComponent },
    { path: 'filters', component: FiltersComponent }
];
