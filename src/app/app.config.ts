import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    LucideAngularModule
} from 'lucide-angular';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),

        importProvidersFrom(
            LucideAngularModule.pick({
                ArrowUpDown,
                ChevronsLeft,
                ChevronLeft,
                ChevronRight,
                ChevronsRight
            })
        )
    ]
};
