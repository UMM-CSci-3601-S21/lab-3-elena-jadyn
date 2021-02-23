import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ToDo } from './todos';

@Injectable()
export class ToDosService {
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) {}

  getToDos(filters?: { owner?: string; status?: boolean; body?: string; category?: string}): Observable<ToDo[]> {
    let httpParams: HttpParams = new HttpParams();

    if (filters) {
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.status) {
        httpParams = httpParams.set('status', String(filters.status));
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
    }
    return this.httpClient.get<ToDo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getToDoById(id: string): Observable<ToDo> {
    return this.httpClient.get<ToDo>(this.todoUrl + '/' + id);
  }

  filterToDos(todos: ToDo[], filters: { owner?: string; status?: boolean; body?: string; category?: string}): ToDo[] {

    let filteredToDos = todos;

    //Filter by owner
    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredToDos = filteredToDos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    //Filter by status
    if (filters.status) {
      filteredToDos = filteredToDos.filter(todo => todo.status = filters.status);
    }

    //Filter by body
    if (filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredToDos = filteredToDos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    //Filter by category
    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredToDos = filteredToDos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    return filteredToDos;
  }
}
