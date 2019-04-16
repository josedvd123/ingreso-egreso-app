import {Action} from '@ngrx/store';
import {IngresoEgresoModel} from './ingreso-egreso.model';

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';


export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor(
        public items: IngresoEgresoModel[]
    ) {
    }
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

export type actions = SetItemsAction | UnsetItemsAction;
