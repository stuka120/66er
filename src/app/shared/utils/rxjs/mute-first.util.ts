import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

export function muteFirst<T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R> {
  return combineLatest([first$, second$]).pipe(
    map(([, second]) => second),
    distinctUntilChanged()
  );
}
