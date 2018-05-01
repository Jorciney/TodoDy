import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import {TodoViewComponent} from './components/todo-view/todo-view.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoViewComponent,
    TodoComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
