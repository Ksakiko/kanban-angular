import { Component, inject, input } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { ButtonComponent } from '../button/button.component';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  // imports: [ButtonComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  todosService = inject(TodosService);

  handleDeleteTodo() {
    this.todosService.deleteTodo(this.todo().id).subscribe((data) => {
      console.log(data);
    });
  }
}
