import * as fromIngresoEgreso from './ingreso-egreso.actions';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {AppState} from '../app.reducer';

export interface IngresoEgresoState {
    items: IngresoEgresoModel[];
}

export interface IngresoEgresoAppState extends AppState {
    ingresoEgreso: IngresoEgresoState;
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
}
