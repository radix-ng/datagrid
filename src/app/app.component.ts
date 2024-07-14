import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SiteHeaderComponent } from './components/site-header.component';

@Component({
    standalone: true,
    imports: [RouterModule, SiteHeaderComponent],
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {}
