import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgresoModel} from './ingreso-egreso.model';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction, UnsetItemsAction} from './ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IngresoEgresoService {
    ingresoEgresoListenerSubscription: Subscription = new Subscription();
    ingresoEgresoItemsSubscription: Subscription = new Subscription();

    constructor(
        private afDB: AngularFirestore,
        private authService: AuthService,
        private store: Store<AppState>
    ) {
    }

    initIngresoEgresoListener() {
        this.ingresoEgresoListenerSubscription = this.store.select('auth')
            .pipe(
                filter(auth => auth.user != null)
            )
            .subscribe(auth =>
                this.ingresoEgresoItems(auth.user.uid)
            );
    }

    private ingresoEgresoItems(uid: string) {
        this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
            .snapshotChanges()
            .pipe(
                map(items => {
                    return items.map(item => {
                        return {
                            uid: item.payload.doc.id,
                            ...item.payload.doc.data()
                        };
                    });
                })
            )
            .subscribe((items: any[]) => {
                this.store.dispatch(new SetItemsAction(items));
            });
    }

    crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {
        const user = this.authService.getUser();
        return this.afDB.doc(`${user.uid}/ingresos-egresos`)
            .collection('items')
            .add({
                ...ingresoEgreso
            });
    }

    deleteIngresoEgreso(uid: string) {
        const user = this.authService.getUser();

        return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
            .delete();
    }

    cancelSubscription() {
        this.ingresoEgresoListenerSubscription.unsubscribe();
        this.ingresoEgresoItemsSubscription.unsubscribe();
        this.store.dispatch(new UnsetItemsAction());
    }
}
