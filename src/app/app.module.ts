import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {TodoComponent} from './components/todo/todo.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import {TodoViewComponent} from './components/todo-view/todo-view.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FirebaseService} from './services/firebase.service';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '**', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TodoViewComponent,
    TodoComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBhNRdf-ZUtbpzfI5UaykRNqMgbodGBZBY',
      authDomain: 'jdc-todody.firebaseapp.com',
      databaseURL: 'https://jdc-todody.firebaseio.com/',
      storageBucket: 'jdc-todody.appspot.com',
      messagingSenderId: '258941864321'
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
