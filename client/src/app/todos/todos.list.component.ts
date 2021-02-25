import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { ToDo } from './todos';
import { ToDosService } from './todos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';


@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class ToDosListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredToDos: ToDo[];
  public filteredToDos: ToDo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;
  public todoLimit: number;
  public todoSort: string;


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
      body: this.todoBody,
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
      this.serverFilteredToDos, { status: this.getStatus(), category: this.todoCategory })
      .slice(0, this.todoLimit);

      if(this.todoSort !== undefined){
        this.filteredToDos = this.filteredToDos.sort((first, second) => {
          const firstValue  = first[this.todoSort];
          const secondValue = second[this.todoSort];
          return firstValue === secondValue ? 0 : firstValue > secondValue ? 1 : -1;
        });
      }
  }
  public getStatus() {
    const result = this.todoStatus !== undefined ? this.todoStatus === 'complete' : undefined;
    return result;
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getToDosFromServer();
  }
}
