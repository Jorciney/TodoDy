import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public  ROOT = '/';

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private firebaseService: FirebaseService) {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        }
      }
    );
  }

  signingWithFb(): Promise<any> {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  signingWithGoogle(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseAuth.auth.signInWithPopup(provider);
  }

  isLoggedIn() {
    return this.userDetails != null;
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
