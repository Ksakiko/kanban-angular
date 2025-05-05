import { Component, computed, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { List } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  filterTodos = output<void>();
  todoInput = '';
  list = input.required<List>();
  listId = computed(() => this.list().id);

  todosService = inject(TodosService);

  handleSubmit() {
    const newTodo = {
      todo: this.todoInput,
      listId: this.listId()!,
    };

    this.todosService.addNewTodo(newTodo).subscribe(() => {
      // Update the lists in frontend
      this.filterTodos.emit();
    });
  }
}
