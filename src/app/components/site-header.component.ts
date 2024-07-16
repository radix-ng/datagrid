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
                    <a
                        shButton
                        variant="ghost"
                        size="icon"
                        target="_blank"
                        href="https://github.com/radix-ng/datagrid"
                    >
                        <svg viewBox="0 0 15 15" width="1.2em" height="1.2em" class="h-4 w-4">
                            <path
                                fill="currentColor"
                                fill-rule="evenodd"
                                d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A6.963 6.963 0 0 1 7.5 3.756A6.97 6.97 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </a>
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
