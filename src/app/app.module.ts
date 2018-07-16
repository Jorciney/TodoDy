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
import {FirebaseService} from './service/firebase.service';


@NgModule({
  declarations: [
    AppComponent,
    TodoViewComponent,
    TodoComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBhNRdf-ZUtbpzfI5UaykRNqMgbodGBZBY',
      authDomain: '',
      databaseURL: 'https://jdc-todody.firebaseio.com/',
      storageBucket: '',
      messagingSenderId: ''
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
