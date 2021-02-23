import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDo } from './todos';
import { ToDosService } from './todos.service';

@Component({
  selector: 'app-todo-profile',
  templateUrl: './todo-profile.component.html',
  styleUrls: ['./todo-profile.component.scss']
})
export class ToDoProfileComponent implements OnInit {

  todo: ToDo;
  id: string;

  constructor(private route: ActivatedRoute, private todoService: ToDosService) { }

  ngOnInit(): void {
    // We subscribe to the parameter map here so we'll be notified whenever
    // that changes (i.e., when the URL changes) so this component will update
    // to display the newly requested todo.
    this.route.paramMap.subscribe((pmap) => {
      this.id = pmap.get('id');
      this.todoService.getToDoById(this.id).subscribe(todo => this.todo = todo);
    });
  }

}
