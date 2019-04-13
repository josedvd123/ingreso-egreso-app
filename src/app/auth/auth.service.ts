import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivateLoadingAction, DeactivateLoadingAction} from '../shared/ui.actions';
import {SetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubscription: Subscription = new Subscription();

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private afDB: AngularFirestore,
        private store: Store<AppState>
    ) {
    }

    initAuthListener() {
        this.afAuth.authState
            .subscribe((fbUser: firebase.User) => {
                if (fbUser) {
                    this.userSubscription = this.afDB.doc(`${fbUser.uid}/user`)
                        .valueChanges()
                        .subscribe((user: any) => {
                            const newUser = new User(user);
                            this.store.dispatch(
                                new SetUserAction(newUser)
                            );
                        });
                } else {
                    this.userSubscription.unsubscribe();
                }

            });
    }

    newUser(name: string, email: string, password: string) {
        this.store.dispatch(new ActivateLoadingAction());

        this.afAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                // console.log(res);
                const user: User = {
                    uid: res.user.uid,
                    email: res.user.email,
                    name
                };

                this.afDB.doc(`${user.uid}/user`)
                    .set(user);

                this.router.navigate(['/']);
                this.store.dispatch(new DeactivateLoadingAction());
            })
            .catch(err => {
                // console.error(err);
                this.store.dispatch(new DeactivateLoadingAction());

                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    type: 'error'
                });
            });
    }

    login(email: string, password: string) {
        this.store.dispatch(new ActivateLoadingAction());
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                // console.log(res);

                this.router.navigate(['/']);
                this.store.dispatch(new DeactivateLoadingAction());
            })
            .catch(err => {
                // console.error(err);
                this.store.dispatch(new DeactivateLoadingAction());

                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    type: 'error'
                });
            });
    }

    logout() {
        this.router.navigate(['/login']);
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.afAuth.authState
            .pipe(
                map(fbUser => {
                    if (fbUser == null) {
                        this.router.navigate(['/login']);
                    }
                    return fbUser != null;
                })
            );
    }
}
