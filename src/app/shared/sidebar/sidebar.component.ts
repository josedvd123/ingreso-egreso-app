import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {filter} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
    name: string;
    subscription: Subscription = new Subscription();

    constructor(
        public authService: AuthService,
        public ingresoEgresoService: IngresoEgresoService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.subscription = this.store.select('auth')
            .pipe(
                filter(auth => auth.user != null)
            )
            .subscribe((auth) => {
                this.name = auth.user.name;
            });
    }

    logout() {
        this.authService.logout();
        this.ingresoEgresoService.cancelSubscription();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
