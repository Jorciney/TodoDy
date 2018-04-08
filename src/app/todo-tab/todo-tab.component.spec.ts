import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoTabComponent } from './todo-tab.component';

describe('TodoTabComponent', () => {
  let component: TodoTabComponent;
  let fixture: ComponentFixture<TodoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
