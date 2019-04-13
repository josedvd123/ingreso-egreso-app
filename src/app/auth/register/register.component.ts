import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
    isLoading: boolean;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private store: Store<AppState>
    ) {
    }

    ngOnInit() {
        this.subscription = this.store.select('ui')
            .subscribe(ui =>
                this.isLoading = ui.isLoading
            );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(data: any) {
        this.authService.newUser(data.name, data.email, data.password);
    }

}
