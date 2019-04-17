import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
// import {AppState} from '../../app.reducer';
import {IngresoEgresoModel} from '../ingreso-egreso.model';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import {IngresoEgresoAppState} from '../ingreso-egreso.reducer';


@Component({
    selector: 'app-detalle',
    templateUrl: './detalle.component.html',
    styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
    items: IngresoEgresoModel[];
    subscription: Subscription = new Subscription();

    constructor(
        private store: Store<IngresoEgresoAppState>,
        public ingresoEgresoService: IngresoEgresoService
    ) {
    }

    ngOnInit() {
        this.subscription = this.store.select('ingresoEgreso')
            .subscribe(ingresoEgreso => {
                this.items = ingresoEgreso.items;
            });
    }

    deleteItem(item: IngresoEgresoModel) {
        this.ingresoEgresoService.deleteIngresoEgreso(item.uid)
            .then(() => {
                Swal.fire({
                    title: 'Eliminado!',
                    text: item.description,
                    type: 'success'
                });
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
