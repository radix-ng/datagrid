import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, TemplateRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShButtonDirective } from '@radix-ng/shadcn/button';
import { ShInputDirective } from '@radix-ng/shadcn/input';
import {
    TableBodyDirective,
    TableCellDirective,
    TableDirective,
    TableFooterDirective,
    TableHeadDirective,
    TableHeaderDirective,
    TableRowDirective
} from '@radix-ng/shadcn/table';
import {
    ColumnDef,
    createAngularTable,
    FlexRenderComponent,
    FlexRenderDirective,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    type ColumnFiltersState
} from '@tanstack/angular-table';
import { LucideAngularModule } from 'lucide-angular';

import dataTasks from '../../../../public/data/tasks.json';
import {
    ViewTableHeadSelectionComponent,
    ViewTableRowSelectionComponent
} from './components/selection-column.component';
import { FilterComponent } from './components/table-filter.component';

type Task = {
    id: string;
    title: string;
    status: string;
    label: string;
    priority: string;
};

@Component({
    selector: 'app-views',
    standalone: true,
    imports: [
        FilterComponent,
        FlexRenderDirective,
        FormsModule,
        NgClass,
        TableDirective,
        TableHeaderDirective,
        ShButtonDirective,
        TableBodyDirective,
        TableFooterDirective,
        TableRowDirective,
        TableCellDirective,
        TableHeadDirective,
        ShInputDirective,
        LucideAngularModule
    ],
    templateUrl: './view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent {
    readonly columnFilters = signal<ColumnFiltersState>([]);
    readonly columnSorting = signal<SortingState>([]);

    readonly data = dataTasks as Task[];

    readonly titleCell = viewChild.required<TemplateRef<unknown>>('lastNameCell');

    readonly columns: ColumnDef<Task>[] = [
        {
            id: 'select',
            header: () => {
                return new FlexRenderComponent(ViewTableHeadSelectionComponent);
            },
            cell: () => {
                return new FlexRenderComponent(ViewTableRowSelectionComponent);
            }
        },
        {
            accessorKey: 'id',
            header: () => 'Task',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'title',
            header: () => 'Title',
            cell: (info) => this.titleCell(),
            enableSorting: true
        },
        {
            accessorKey: 'status',
            header: () => 'Status',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'label',
            cell: (info) => info.getValue()
        },
        {
            accessorKey: 'priority',
            cell: (info) => info.getValue()
        }
    ];

    table = createAngularTable<Task>(() => ({
        columns: this.columns,
        data: this.data,
        state: {
            sorting: this.columnSorting(),
            columnFilters: this.columnFilters()
        },
        onColumnFiltersChange: (updater) => {
            updater instanceof Function
                ? this.columnFilters.update(updater)
                : this.columnFilters.set(updater);
        },
        onSortingChange: (updater) => {
            updater instanceof Function
                ? this.columnSorting.update(updater)
                : this.columnSorting.set(updater);
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client-side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(), // client-side faceting
        getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
        getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
        debugTable: true,
        debugHeaders: true,
        debugColumns: false
    }));

    onPageSizeChange(event: any): void {
        this.table.setPageSize(Number(event.target.value));
    }
}
