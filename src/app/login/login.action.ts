import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOGIN: '[Auth] login',
    LOGIN_SUCCESS: '[Auth] login success',
    LOGIN_FAIL: '[Auth] login fail',
    LOGOUT_SUCCESS: '[Auth] logout success',
    USER_LOGGED: '[Auth] user is logged in'
};

export class LoginAction implements Action {
    type = ActionTypes.LOGIN;

    constructor(public payload: any = {}) { }
}

export class LoginSuccessAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: any = {}) { }
}

export class LoginFailAction implements Action {
    type = ActionTypes.LOGIN_FAIL;

    constructor(public payload: any = {}) { }
}

export class LogoutSuccessAction implements Action {
    type = ActionTypes.LOGOUT_SUCCESS;

    constructor(public payload: any = {}) { }
}

export class UserLoggedAction implements Action {
    type = ActionTypes.USER_LOGGED;

    constructor(public payload: any) {}
}

export type Actions
    = LoginAction
    | LoginSuccessAction
    | LoginFailAction
    | LogoutSuccessAction
    | UserLoggedAction
    ;
