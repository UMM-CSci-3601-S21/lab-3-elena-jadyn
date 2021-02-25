import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToDo } from '../app/todos/todos';
import { ToDosService } from '../app/todos/todos.service';

/**
 * A "mock" version of the `ToDosService` that can be used to test components
 * without having to create an actual service.
 */
@Injectable()
export class MockToDosService extends ToDosService {
  static testToDos: ToDo[] = [
    {
      _id: '58895985a22c04e761776d54',
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: '58895985c1849992336c219b',
      owner: 'Fry',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: '58895985ae3b752b124e7663',
      owner: 'Fry',
      status: true,
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'homework'
    }
  ];

  constructor() {
    super(null);
  }

  getToDos(filters: { owner?: string; status?: boolean; category?: string; body: string}): Observable<ToDo[]> {

    return of(MockToDosService.testToDos);
  }

  getToDoById(id: string): Observable<ToDo> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockToDosService.testToDos[0]._id) {
      return of(MockToDosService.testToDos[0]);
    } else if (id === MockToDosService.testToDos[1]._id) {
      return of(MockToDosService.testToDos[1]);
    } else if (id === MockToDosService.testToDos[2]._id) {
      return of(MockToDosService.testToDos[2]);
    }else {
      return of(null);
    }
  }
}
