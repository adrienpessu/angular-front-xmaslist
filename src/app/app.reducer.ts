import {combineReducers} from '@ngrx/store';
import * as fromList from './list/list.reducer';

export const reducers = {
    list: fromList.listReducer,
};

const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
    return productionReducer(state, action);
}
