import { Component, OnInit, Input } from '@angular/core';
import { ToDo } from './todos';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styles:[]
})
export class ToDoCardComponent implements OnInit {

  @Input() todo: ToDo;
  @Input() simple?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
