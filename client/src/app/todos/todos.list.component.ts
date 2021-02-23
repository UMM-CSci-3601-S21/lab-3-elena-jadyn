import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { ToDo } from './todos';
import { ToDosService } from './todos.service';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class ToDosListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredToDos: ToDo[];
  public filteredToDos: ToDo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  public todoCategory: string;
  public viewType: 'list';

  //Inject the ToDosService into this component.
  //That's what happens in the following constructor.
  //
  //We can call upon the service for interacting
  //with the server.
  constructor(private todosService: ToDosService, private snackBar: MatSnackBar) {

  }

  getToDosFromServer() {
    this.todosService.getToDos({
      owner: this.todoOwner,
      status: this.todoStatus,
      body: this.todoBody,
      category: this.todoCategory,
    }).subscribe(returnedToDos => {
      this.serverFilteredToDos = returnedToDos;
      this.updateFilter();
    }, err => {
      // If there was an error getting the todos, display
      // a message.
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });
    });
  }

  public updateFilter() {
    this.filteredToDos = this.todosService.filterToDos(
      this.serverFilteredToDos, { owner: this.todoOwner, status: this.todoStatus, body: this.todoBody, category: this.todoCategory});
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getToDosFromServer();
  }
}
