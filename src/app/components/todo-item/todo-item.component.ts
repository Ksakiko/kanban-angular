import { Component, inject, input, output } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  filterTodos = output<void>();
  todosService = inject(TodosService);

  handleDeleteTodo() {
    this.todosService.deleteTodo(this.todo().id).subscribe(() => {
      // Update the lists in frontend
      this.filterTodos.emit();
    });
  }
}
