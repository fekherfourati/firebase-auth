import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _angularFireAuthentication: AngularFireAuth) { }

  login(credentials: any) {
    return new Promise((resolve, reject) => {
        this._angularFireAuthentication
        .signInWithEmailAndPassword(credentials['email'],credentials['password'])
        // .auth
        //     .signInWithEmailAndPassword(credentials.emailaddress, credentials.password)
            .then(
                result => resolve(result),
                error => reject(error)
            );
    });
}
}
