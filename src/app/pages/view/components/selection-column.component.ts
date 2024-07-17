import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ShCheckboxComponent } from '@radix-ng/shadcn/checkbox';
import {
    injectFlexRenderContext,
    type CellContext,
    type HeaderContext
} from '@tanstack/angular-table';

@Component({
    template: `
        <input
            type="checkbox"
            [checked]="context.table.getIsAllRowsSelected()"
            [indeterminate]="context.table.getIsSomeRowsSelected()"
            (change)="context.table.toggleAllRowsSelected()"
        />
    `,
    host: {
        class: 'px-1 block'
    },
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTableHeadSelectionComponent<T> {
    context = injectFlexRenderContext<HeaderContext<T, unknown>>();
}

@Component({
    template: `
        <sh-checkbox
            class="flex"
            (change)="context.row.getToggleSelectedHandler()($event)"
        ></sh-checkbox>
    `,
    host: {
        class: 'px-1 block'
    },
    standalone: true,
    imports: [ShCheckboxComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTableRowSelectionComponent<T> {
    context = injectFlexRenderContext<CellContext<T, unknown>>();
}
