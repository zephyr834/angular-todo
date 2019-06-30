import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import{ TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];
  
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }

  deleteTodo(todo:Todo){
    //Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //Remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }
}
