import { ActionReducer, Action } from '@ngrx/store';
import * as login from './login.action';

export interface State {
    login: string;
    password: string;
    showErrorMsg: boolean;
}

export const initialState: State = {
    login: '',
    password: '',
    showErrorMsg: false
};

export function loginReducer(state = initialState, action: login.Actions): State {
    switch (action.type) {
        case login.ActionTypes.LOGIN:
            return Object.assign({}, state, {
                showErrorMsg: false
            });
        case login.ActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                showErrorMsg: false
            });
        case login.ActionTypes.LOGIN_FAIL:
            return Object.assign({}, state, {
                showErrorMsg: true
            });
        case login.ActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                showErrorMsg: false
            });
        default:
            return Object.assign({}, state);
    }
};
