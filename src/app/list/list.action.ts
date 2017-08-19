import {Action} from '@ngrx/store';

export const ActionTypes = {
    GET_PRESENTS_BY_CHILD: '[List] get present by child',
    GET_PRESENTS_BY_CHILD_SUCCESS: '[List] get present by child success',
    GET_PRESENTS_BY_CHILD_FAIL: '[List] get present by child fail',
    GET_CHILDS: '[List] get childs',
    GET_CHILDS_SUCCESS: '[List] get childs success',
    GET_CHILDS_FAIL: '[List] get childs fail',
    REMOVE_PRESENTS: '[List] remove present ',
    REMOVE_PRESENTS_SUCCESS: '[List] remove present success',
    REMOVE_PRESENTS_FAIL: '[List] remove present fail',
    ADD_PRESENTS: '[List] add present ',
    ADD_PRESENTS_SUCCESS: '[List] add present success',
    ADD_PRESENTS_FAIL: '[List] add present fail',
    CHECK_PRESENTS: '[List] check present ',
    CHECK_PRESENTS_SUCCESS: '[List] check present success',
    CHECK_PRESENTS_FAIL: '[List] check present fail',
    UNCHECK_PRESENTS: '[List] uncheck present ',
    UNCHECK_PRESENTS_SUCCESS: '[List] uncheck present success',
    UNCHECK_PRESENTS_FAIL: '[List] uncheck present fail',
};

export class GetPresentsByChildAction implements Action {
    type = ActionTypes.GET_PRESENTS_BY_CHILD;

    constructor() {
    }
}

export class GetPresentsByChildSuccessAction implements Action {
    type = ActionTypes.GET_PRESENTS_BY_CHILD_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetPresentsByChildFailAction implements Action {
    type = ActionTypes.GET_PRESENTS_BY_CHILD_FAIL;

    constructor() {
    }
}

export class GetChildsAction implements Action {
    type = ActionTypes.GET_CHILDS;

    constructor() {
    }
}

export class GetChildsSuccessAction implements Action {
    type = ActionTypes.GET_CHILDS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetChildsFailAction implements Action {
    type = ActionTypes.GET_CHILDS_FAIL;

    constructor() {
    }
}

export class RemovePresentAction implements Action {
    type = ActionTypes.REMOVE_PRESENTS;

    constructor() {
    }
}

export class RemovePresentSuccessAction implements Action {
    type = ActionTypes.REMOVE_PRESENTS_SUCCESS;

    constructor() {
    }
}

export class RemovePresentFailAction implements Action {
    type = ActionTypes.REMOVE_PRESENTS_FAIL;

    constructor() {
    }
}

export class AddPresentAction implements Action {
    type = ActionTypes.ADD_PRESENTS;

    constructor() {
    }
}

export class AddPresentSuccessAction implements Action {
    type = ActionTypes.ADD_PRESENTS_SUCCESS;

    constructor() {
    }
}

export class AddPresentFailAction implements Action {
    type = ActionTypes.ADD_PRESENTS_FAIL;

    constructor() {
    }
}

export class CheckPresentAction implements Action {
    type = ActionTypes.ADD_PRESENTS;

    constructor() {
    }
}

export class CheckPresentSuccessAction implements Action {
    type = ActionTypes.ADD_PRESENTS_SUCCESS;

    constructor() {
    }
}

export class CheckPresentFailAction implements Action {
    type = ActionTypes.ADD_PRESENTS_FAIL;

    constructor() {
    }
}

export class UnCheckPresentAction implements Action {
    type = ActionTypes.ADD_PRESENTS;

    constructor() {
    }
}

export class UnCheckPresentSuccessAction implements Action {
    type = ActionTypes.ADD_PRESENTS_SUCCESS;

    constructor() {
    }
}

export class UnCheckPresentFailAction implements Action {
    type = ActionTypes.ADD_PRESENTS_FAIL;

    constructor() {
    }
}


export type Actions
    = GetPresentsByChildAction
    | GetPresentsByChildSuccessAction
    | GetPresentsByChildFailAction
    | GetChildsAction
    | GetChildsSuccessAction
    | GetChildsFailAction
    | GetChildsAction
    | GetChildsSuccessAction
    | GetChildsFailAction
    | RemovePresentAction
    | RemovePresentSuccessAction
    | RemovePresentFailAction
    | AddPresentAction
    | AddPresentSuccessAction
    | AddPresentFailAction
    | CheckPresentAction
    | CheckPresentSuccessAction
    | CheckPresentFailAction
    | UnCheckPresentAction
    | UnCheckPresentSuccessAction
    | UnCheckPresentFailAction;
