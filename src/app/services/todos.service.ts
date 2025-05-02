import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { List, Todo } from '../models/todo.model';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private url = 'http://localhost:3000/todos';

  // todos: Todo[] = [];
  todos = signal(this.getAllTodos());

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getTodosByListId(id?: string): Observable<Todo[]> {
    const todos = this.getAllTodos();

    // TODO: Find a way to solve this
    const filteredTodos = todos.pipe(filter<Todo[]>((x) => x.listId === id));

    return filteredTodos;
  }

  addNewTodo(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Todo>(this.url, todo, httpOptions);
  }

  deleteTodo(id: string | undefined): Observable<unknown> {
    const endpoint = `/${id}`;
    return this.http.delete(this.url + endpoint);
  }
}
