import { Directive, ElementRef, inject, input, NgZone } from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import {
    debounceTime,
    fromEvent,
    Observable,
    switchMap,
    type MonoTypeOperatorFunction
} from 'rxjs';

export function runOutsideAngular<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
    return (source) =>
        new Observable((subscriber) => zone.runOutsideAngular(() => source.subscribe(subscriber)));
}

@Directive({
    standalone: true,
    selector: 'input[debouncedInput]'
})
export class DebouncedInputDirective {
    #ref = inject(ElementRef).nativeElement as HTMLInputElement;

    readonly debounce = input<number>(500);
    readonly debounce$ = toObservable(this.debounce);

    readonly changeEvent = outputFromObservable(
        this.debounce$.pipe(
            switchMap((debounce) => {
                return fromEvent(this.#ref, 'change').pipe(debounceTime(debounce));
            })
        )
    );
}
