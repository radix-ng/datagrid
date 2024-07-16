import { Route } from '@angular/router';

import { BaseComponent } from './pages/base/base.component';
import { ColumnOrderingComponent } from './pages/column-ordering/column-ordering.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { RowSelectionComponent } from './pages/row-selection/row-selection.component';
import { ViewComponent } from './pages/view/view.component';

export const appRoutes: Route[] = [
    { path: '', component: ViewComponent },
    { path: 'base', component: BaseComponent },
    { path: 'view', component: ViewComponent },
    { path: 'column-ordering', component: ColumnOrderingComponent },
    { path: 'row-selection', component: RowSelectionComponent },
    { path: 'filters', component: FiltersComponent }
];
