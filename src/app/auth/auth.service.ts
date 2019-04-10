import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private afDB: AngularFirestore
    ) {
    }

    initAuthListener() {
        this.afAuth.authState
            .subscribe((fbUser: firebase.User) => {
                console.log(fbUser);

            });
    }

    newUser(name: string, email: string, password: string) {
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
            })
            .catch(err => {
                // console.error(err);

                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    type: 'error'
                });
            });
    }

    login(email: string, password: string) {
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                // console.log(res);

                this.router.navigate(['/']);
            })
            .catch(err => {
                // console.error(err);

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
