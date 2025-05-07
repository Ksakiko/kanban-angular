import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodosService } from '../../services/todos.service';
import { List, Todo } from '../../models/todo.model';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListContainerComponent implements OnInit {
  todosService = inject(TodosService);
  listsService = inject(ListsService);

  list = input.required<List>();
  public todoListId = computed(() => this.list().id);
  getTempUpdatedTodoLists = output<string>();

  formIsVisible = signal(false);
  filteredTodos = signal<Todo[]>([]);

  ngOnInit(): void {
    this.filterTodos();
  }

  filterTodos = async () => {
    this.formIsVisible.set(false);
    this.todosService.getAllTodos().subscribe({
      next: (data: any) => {
        const newTodos = data.filter((todo: { listId: string | undefined }) => {
          return todo.listId === this.todoListId();
        });
        this.filteredTodos.set(newTodos);
      },
      error: (err) => console.error(err),
    });
  };

  handleAddTodo() {
    this.formIsVisible.set(true);
  }

  handleDeleteList = () => {
    const todosToBeDeleted = this.filteredTodos().filter(
      (x) => x.listId === this.todoListId()
    );

    const todoIds = todosToBeDeleted.map((x) => x.id);

    // Update the lists realtime in frontend
    this.getTempUpdatedTodoLists.emit(this.todoListId()!);

    // Handle delete todos that belong to the list to be deleted in backend
    this.todosService.deleteMultipleTodos(todoIds);

    // Handle delete in backend
    this.listsService.deleteList(this.todoListId()!).subscribe(() => {});
  };
}
