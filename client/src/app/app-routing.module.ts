import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToDoProfileComponent } from './todos/todo-profile.component';
import { ToDosListComponent } from './todos/todos.list.component';
import { UserListComponent } from './users/user-list.component';
import { UserProfileComponent } from './users/user-profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UserListComponent},
  {path: 'users/:id', component: UserProfileComponent},
  {path: 'todos', component: ToDosListComponent},
  {path: 'todos/:id', component: ToDoProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
