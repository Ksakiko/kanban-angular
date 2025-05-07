import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { List, Todo, TodoInput } from '../models/todo.model';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private url = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  addNewTodo(todo: TodoInput): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Todo>(this.url, todo, httpOptions);
  }

  deleteTodo(id: string | undefined): Observable<unknown> {
    const endpoint = `/${id}`;
    // return this.http.delete(this.url + endpoint);
    return this.http.delete(`${this.url}/${id}`);
  }

  // Use this in order to delete todos by listId
  deleteMultipleTodos = async (todoIds: (string | undefined)[]) => {
    const urls = todoIds.map((id) => this.http.delete(`${this.url}/${id}`));

    forkJoin(urls).subscribe((data) => {
      return data;
    });
  };
}
