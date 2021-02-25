import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockToDosService } from '../../testing/todo.service.mock';
import { ToDo } from './todos';
import { ToDosListComponent } from './todos.list.component';
import { ToDosService } from './todos.service';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodosListComponent', () => {

  let toDosList: ToDosListComponent;
  let fixture: ComponentFixture<ToDosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ToDosListComponent],

      providers: [{ provide: ToDosService, useValue: new MockToDosService() }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(ToDosListComponent);
      toDosList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the todos', () => {
    expect(toDosList.serverFilteredToDos.length).toBe(3);
  });

  it('contains a todo has owner named "Fry"', () => {
    expect(toDosList.serverFilteredToDos.some((toDo: ToDo) => toDo.owner === 'Fry')).toBe(true);
  });

  it('contains a todo has owner named "Blanche"', () => {
    expect(toDosList.serverFilteredToDos.some((toDo: ToDo) => toDo.owner === 'Blanche')).toBe(true);
  });

  it('doesn\'t contain a todo has owner named "Jessica"', () => {
    expect(toDosList.serverFilteredToDos.some((toDo: ToDo) => toDo.owner === 'Jessica')).toBe(false);
  });

  it('has one todo that has the category homework', () => {
    expect(toDosList.serverFilteredToDos.filter((toDo: ToDo) => toDo.category === 'homework').length).toBe(1);
  });

  it('has one todo that has the "cillum" in the body', () => {
    expect(toDosList.serverFilteredToDos.filter((toDo: ToDo) => toDo.body.includes('cillum') === true).length).toBe(2);
  });
});
