import { Component, OnInit } from '@angular/core';

import { ShBadgeDirective } from '@radix-ng/shadcn/badge';
import { injectFlexRenderContext, type CellContext } from '@tanstack/angular-table';

import { Task } from '../types';

@Component({
    standalone: true,
    imports: [ShBadgeDirective],
    template: `
        <div class="flex space-x-2">
            <div shBadge variant="outline">{{ label }}</div>
            <span class="max-w-[31.25rem] truncate font-medium">
                {{ context.getValue() }}
            </span>
        </div>
    `
})
export class ViewTitleRowComponent<T> implements OnInit {
    context = injectFlexRenderContext<CellContext<T, unknown>>();

    label = '';

    ngOnInit() {
        this.label = (this.context.row.original as Task).label;
    }
}
