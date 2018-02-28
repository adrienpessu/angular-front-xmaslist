import {combineReducers, ActionReducerMap} from '@ngrx/store';
import * as fromList from './list/list.reducer';
import * as fromLogin from './login/login.reducer';
import { ActionReducer } from '@ngrx/store';

export interface State {
  list: fromList.State;
  login: fromLogin.State;
}

const reducers = {
  list: fromList.listReducer,
  login: fromLogin.loginReducer
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);
export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}

