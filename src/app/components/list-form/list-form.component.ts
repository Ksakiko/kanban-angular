import { Component, inject, output, signal } from '@angular/core';
import { ListsService } from '../../services/lists.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-form',
  imports: [FormsModule],
  templateUrl: './list-form.component.html',
  styleUrl: './list-form.component.css',
})
export class ListFormComponent {
  listsService = inject(ListsService);
  getTodoLists = output<void>();
  listTitleInput = '';

  handleSubmit = async () => {
    if (this.listTitleInput === '') return;
    const newList = {
      title: this.listTitleInput,
    };

    this.listsService.addNewList(newList).subscribe(() => {
      // Emit to get updated data from backend and rerender the lists
      this.getTodoLists.emit();
    });
  };
}
