import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  todoInput = '';

  todosService = inject(TodosService);

  handleSubmit() {
    const newTodo = {
      todo: this.todoInput,
    };
    this.todosService.addNewTodo(newTodo).subscribe((res) => {
      console.log(res);
    });
  }
}
