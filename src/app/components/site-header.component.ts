import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { ShButtonDirective } from '@radix-ng/shadcn/button';

@Component({
    selector: 'app-site-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, RouterOutlet, ShButtonDirective],
    template: `
        <header
            class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/40"
        >
            <div class="container flex h-14 items-center">
                <a class="mr-6 flex items-center space-x-2" href="/">
                    <svg
                        class="h-6 w-6"
                        viewBox="0 0 256 256"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_102_1338)">
                            <path
                                d="M208 128L128 208"
                                stroke="#E90464"
                                stroke-width="16"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                            <path
                                d="M192 40L40 192"
                                stroke="#E90464"
                                stroke-width="16"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_102_1338">
                                <rect width="256" height="256" fill="white"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="hidden font-bold sm:inline-block">NG TanStack Table</span>
                </a>
                <nav class="flex items-center gap-4 text-sm lg:gap-6">
                    @for (route of routes; track route.path) {
                        @if (route.external) {
                            <a
                                [href]="route.path"
                                target="_blank"
                                class="transition-colors hover:text-foreground/80"
                                [class]="getRouteClasses(route)"
                            >
                                {{ route.label }}
                            </a>
                        } @else {
                            <a
                                [routerLink]="route.path"
                                [routerLinkActiveOptions]="{ exact: route.exact ?? false }"
                                routerLinkActive="text-foreground"
                                class="transition-colors hover:text-foreground/80"
                                [class]="getRouteClasses(route)"
                            >
                                {{ route.label }}
                            </a>
                        }
                    }
                </nav>
                <nav class="flex flex-1 items-center justify-end">
                    <button shButton variant="ghost" size="icon" class="size-8"></button>
                </nav>
            </div>
        </header>
    `
})
export class SiteHeaderComponent {
    private readonly router = inject(Router);

    protected readonly routes: {
        path: string;
        exact?: boolean;
        external?: boolean;
        label: string;
    }[] = [
        { path: '/', exact: true, label: 'Base' },
        { path: '/column-ordering', exact: true, label: 'Column Ordering' },
        { path: '/filters', exact: true, label: 'Filters' },
        { path: '/row-selection', exact: true, label: 'Row Selection' }
    ];

    isActive(route: { path: string; exact?: boolean; label: string; external?: boolean }): boolean {
        if (route.external) {
            return false;
        }
        return this.router.url === route.path;
    }

    getRouteClasses(route: any): string {
        const baseClasses = this.isActive(route) ? 'text-foreground' : 'text-foreground/60';
        const additionalClasses =
            route.path === '/docs/getting-started/installation' ? ' hidden md:block' : '';
        return baseClasses + additionalClasses;
    }
}
