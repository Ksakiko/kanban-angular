import { Component, inject } from '@angular/core';
import { TodoListContainerComponent } from '../todo-list/todo-list.component';
import { ListsService } from '../../services/lists.service';
import { List } from '../../models/todo.model';

@Component({
  selector: 'app-kanban-board',
  imports: [TodoListContainerComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css',
})
export class KanbanBoardComponent {
  lists: List[] = [];
  listsService = inject(ListsService);

  ngOnInit(): void {
    this.listsService.getAllLists().subscribe({
      next: (data: any) => {
        this.lists = data;
      },
      error: (err) => console.error(err),
    });
  }
}
