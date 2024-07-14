import { Component } from '@angular/core';

import { ShButtonDirective } from '@radix-ng/shadcn/button';

@Component({
    selector: 'app-site-header',
    standalone: true,
    imports: [ShButtonDirective],
    template: `
        <header
            class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/40"
        >
            <div class="container flex h-14 items-center">
                <nav class="flex flex-1 items-center justify-end">
                    <button shButton variant="ghost" size="icon" class="size-8"></button>
                </nav>
            </div>
        </header>
    `
})
export class SiteHeaderComponent {}
