import * as fromIngresoEgreso from './ingreso-egreso.actions';
import {IngresoEgresoModel} from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}

const initState: IngresoEgresoState = {
    items: []
};

export function IngresoEgresoReducer(state = initState, action: fromIngresoEgreso.actions): IngresoEgresoState {
    switch (action.type) {
        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [...action.items.map(item => {
                    return {...item};
                })]
            };

        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }
};
