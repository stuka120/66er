import { RootStoreModule } from "./root-store.module";
import * as RootStoreSelectors from "./selectors";
import * as RootStoreState from "./root-state";

export * from "./posts-store";
export { RootStoreState, RootStoreSelectors, RootStoreModule };
