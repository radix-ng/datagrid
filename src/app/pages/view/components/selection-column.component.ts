import { Component } from '@angular/core';

import { ShCheckboxComponent } from '@radix-ng/shadcn/checkbox';
import {
    injectFlexRenderContext,
    type CellContext,
    type HeaderContext
} from '@tanstack/angular-table';

@Component({
    template: `
        <sh-checkbox
            aria-label="Select all"
            [indeterminate]="
                (!context.table.getIsAllRowsSelected && context.table.getIsAllPageRowsSelected()) ||
                context.table.getIsSomePageRowsSelected()
            "
            (checkedChange)="onCheckedChange($event)"
        ></sh-checkbox>
    `,
    host: {
        class: 'px-1 block'
    },
    standalone: true,
    imports: [ShCheckboxComponent]
})
export class ViewTableHeadSelectionComponent<T> {
    context = injectFlexRenderContext<HeaderContext<T, unknown>>();

    onCheckedChange(checked: boolean) {
        this.context.table.toggleAllRowsSelected(checked);
    }
}

@Component({
    template: `
        <sh-checkbox
            aria-label="Select row"
            (checkedChange)="onCheckedChange($event)"
            [checked]="context.row.getIsSelected()"
        ></sh-checkbox>
    `,
    host: {
        class: 'px-1 block'
    },
    standalone: true,
    imports: [ShCheckboxComponent]
})
export class ViewTableRowSelectionComponent<T> {
    context = injectFlexRenderContext<CellContext<T, unknown>>();

    onCheckedChange(checked: boolean) {
        this.context.row.toggleSelected(checked);
    }
}
