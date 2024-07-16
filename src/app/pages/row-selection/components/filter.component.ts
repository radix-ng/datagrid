import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';

import { Column, type Table } from '@tanstack/angular-table';

@Component({
    selector: 'app-table-filter',
    template: `
        @if (columnType) {
            @if (columnType == 'number') {
                <div class="flex space-x-2">
                    <input
                        #min
                        type="number"
                        class="w-24 rounded border shadow"
                        placeholder="Min"
                        [value]="getMinValue()"
                        (input)="updateMinFilterValue(min.value)"
                    />
                    <input
                        #max
                        type="number"
                        class="w-36 rounded border shadow"
                        placeholder="max"
                        [value]="getMaxValue()"
                        (input)="updateMaxFilterValue(max.value)"
                    />
                </div>
            } @else {
                <input
                    #search
                    type="text"
                    class="w-36 rounded border shadow"
                    placeholder="Search..."
                    [value]="column().getFilterValue() ?? ''"
                    (input)="column().setFilterValue(search.value)"
                />
            }
        }
    `,
    standalone: true,
    imports: [CommonModule]
})
export class FilterComponent<T> implements OnInit {
    column = input.required<Column<any, any>>();

    table = input.required<Table<T>>();

    columnType!: string;

    ngOnInit() {
        this.columnType = typeof this.table()
            .getPreFilteredRowModel()
            .flatRows[0]?.getValue(this.column().id);
    }

    getMinValue() {
        const minValue = this.column().getFilterValue() as any;

        return (minValue?.[0] ?? '') as string;
    }

    getMaxValue() {
        const maxValue = this.column().getFilterValue() as any;
        return (maxValue?.[1] ?? '') as string;
    }

    updateMinFilterValue(newValue: string): void {
        this.column().setFilterValue((old: any) => {
            return [newValue, old?.[1]];
        });
    }

    updateMaxFilterValue(newValue: string): void {
        this.column().setFilterValue((old: any) => [old?.[0], newValue]);
    }
}
