import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
// import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {IngresoEgresoModel} from '../ingreso-egreso.model';
import {Label, MultiDataSet} from 'ng2-charts';
import {IngresoEgresoAppState} from '../ingreso-egreso.reducer';

@Component({
    selector: 'app-estadistica',
    templateUrl: './estadistica.component.html',
    styles: []
})
export class EstadisticaComponent implements OnInit {
    public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
    public doughnutChartData: MultiDataSet = [];

    ingresos: number;
    egresos: number;

    ingresosQty: number;
    egresosQty: number;

    subscription: Subscription = new Subscription();

    constructor(
        private store: Store<IngresoEgresoAppState>
    ) {
    }

    ngOnInit() {
        this.subscription = this.store
            .select('ingresoEgreso')
            .subscribe(ingresoEgreso =>
                this.countIngresoEgreso(ingresoEgreso.items)
            );
    }

    countIngresoEgreso(items: IngresoEgresoModel[]) {
        this.ingresos = 0;
        this.egresos = 0;
        this.ingresosQty = 0;
        this.egresosQty = 0;
        items.forEach(item => {
            if (item.type === 'ingreso') {
                this.ingresosQty++;
                this.ingresos += item.price;
            } else {
                this.egresosQty++;
                this.egresos += item.price;
            }

        });

        this.doughnutChartData = [[this.ingresos, this.egresos]];
    }

}
