import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {IngresoEgresoService} from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {Subscription} from 'rxjs';
import {ActivateLoadingAction, DeactivateLoadingAction} from '../shared/ui.actions';

@Component({
    selector: 'app-ingreso-egreso',
    templateUrl: './ingreso-egreso.component.html',
    styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
    form: FormGroup;
    type = 'ingreso';

    loadingSubs: Subscription = new Subscription();
    loading: boolean;

    constructor(
        public ingresoEgresoService: IngresoEgresoService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.loadingSubs = this.store.select('ui')
            .subscribe(ui => this.loading = ui.isLoading);

        this.form = new FormGroup({
            description: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.min(1)),
        });
    }

    newIngresoEgreso() {
        this.store.dispatch(new ActivateLoadingAction());

        const ingresoEgreso = new IngresoEgresoModel({
            ...this.form.value,
            type: this.type
        });

        this.ingresoEgresoService
            .crearIngresoEgreso(ingresoEgreso)
            .then(() => {
                this.store.dispatch(new DeactivateLoadingAction());

                Swal.fire({
                    title: 'Creado',
                    text: ingresoEgreso.description,
                    type: 'success'
                });
                this.form.reset({
                    price: 0
                });
            })
            .catch((err) => {
                this.store.dispatch(new DeactivateLoadingAction());

                Swal.fire({
                    title: 'Error',
                    text: err.message,
                    type: 'error'
                });
            });
    }

    ngOnDestroy(): void {
        this.loadingSubs.unsubscribe();
    }

}
