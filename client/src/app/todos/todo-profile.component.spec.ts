import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { MockToDosService } from '../../testing/todo.service.mock';
import { ToDo } from './todos';
import { ToDoProfileComponent } from './todo-profile.component';
import { ToDosService } from './todos.service';
import { ToDoCardComponent } from './todo-card.component';

describe('ToDosProfileComponent', () => {
  let component: ToDoProfileComponent;
  let fixture: ComponentFixture<ToDoProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ToDoProfileComponent, ToDoCardComponent],
      providers: [
        { provide: ToDosService, useValue: new MockToDosService() },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a specific todo profile', () => {
    const expectedToDo: ToDo = MockToDosService.testToDos[0];

    activatedRoute.setParamMap({ id: expectedToDo._id });

    expect(component.id).toEqual(expectedToDo._id);
    expect(component.todo).toEqual(expectedToDo);
  });

  it('should navigate to correct toDo when the id parameter changes', () => {
    let expectedToDo: ToDo = MockToDosService.testToDos[0];

    activatedRoute.setParamMap({ id: expectedToDo._id });
    expect(component.id).toEqual(expectedToDo._id);

    expectedToDo = MockToDosService.testToDos[1];
    activatedRoute.setParamMap({ id: expectedToDo._id });

    expect(component.id).toEqual(expectedToDo._id);
  });

  it('should have `null` for the user for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    expect(component.id).toEqual('badID');
    expect(component.todo).toBeNull();
  });
});
