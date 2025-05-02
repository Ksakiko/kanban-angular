import { Injectable } from '@angular/core';
import { List } from '../models/todo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private url = 'http://localhost:3000/lists';

  lists: List[] = [];

  constructor(private http: HttpClient) {}

  getAllLists(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  addNewList(list: List): Observable<List> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<List>(this.url, list, httpOptions);
  }

  deleteList(id: string | undefined): Observable<unknown> {
    const endpoint = `/${id}`;
    return this.http.delete(this.url + endpoint);
  }
}
