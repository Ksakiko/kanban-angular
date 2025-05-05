import { Component, inject, signal } from '@angular/core';
import { TodoListContainerComponent } from '../todo-list/todo-list.component';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/todo.model';
import { ListFormComponent } from '../list-form/list-form.component';

@Component({
  selector: 'app-kanban-board',
  imports: [TodoListContainerComponent, ListFormComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent {
  listsService = inject(ListsService);
  lists = signal<List[]>([]);
  newListIsVisible = signal(false);

  ngOnInit(): void {
    this.getTodoLists();
  }

  getTodoLists = () => {
    this.newListIsVisible.set(false);
    this.listsService.getAllLists().subscribe({
      next: (data: any) => {
        this.lists.set(data);
      },
      error: (err) => console.error(err),
    });
  };

  getTempUpdatedTodoLists = (id: string) => {
    const newList = this.lists().filter((x) => x.id !== id);
    this.lists.set(newList);
  };

  handleAddNewList = () => {
    this.newListIsVisible.set(true);
  };
}
