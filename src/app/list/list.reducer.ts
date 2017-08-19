import {Action, ActionReducer} from '@ngrx/store';
import * as list from './list.action';
import {Present} from './shared/present.model';

export interface ListState {
    presents: Present[];
    childs: any[];
}

export const initialState: ListState = {
    presents: [],
    childs: []
};

export const listReducer: ActionReducer<Object> = (state: ListState = initialState, action: Action) => {
    switch (action.type) {
        case list.ActionTypes.GET_PRESENTS_BY_CHILD_SUCCESS:
            return Object.assign({}, state, {
                presents: action.payload
            });
        case list.ActionTypes.GET_CHILDS_SUCCESS:
            return Object.assign({}, state, {
                childs: action.payload
            });
        case list.ActionTypes.GET_PRESENTS_BY_CHILD:
        case list.ActionTypes.GET_PRESENTS_BY_CHILD_FAIL:
        case list.ActionTypes.GET_CHILDS:
        case list.ActionTypes.GET_CHILDS_FAIL:
        default:
            return Object.assign({}, state);
    }
};
