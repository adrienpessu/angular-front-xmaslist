import * as fromList from './list/list.reducer';

export interface AppStore {
    list: fromList.ListState;
}
