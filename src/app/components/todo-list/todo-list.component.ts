import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ButtonComponent } from '../button/button.component';
import { TodosService } from '../../services/todos.service';
import { List, Todo } from '../../models/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, ButtonComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListContainerComponent implements OnInit {
  todos: Todo[] = [];
  list = input.required<List>();
  inputIsVisible = signal(false);
  todosService = inject(TodosService);

  ngOnInit(): void {
    this.inputIsVisible.set(false); // temp

    this.todosService.getTodosByListId(this.list().id).subscribe({
      next: (data: any) => {
        this.todos = data;
      },
      error: (err) => console.error(err),
    });
    // this.todosService.getAllTodos().subscribe({
    //   next: (data: any) => {
    //     this.todos = data;
    //   },
    //   error: (err) => console.error(err),
    // });
  }

  handleAddTodo() {
    console.log('Add todo');
    this.inputIsVisible.set(true);
  }
}
