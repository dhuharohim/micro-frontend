import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CrudApiService {
  private apiUrl = environment.api_url;
  
  constructor() { }

  getAllWithPagination(endpoint: string, page: number, pageSize: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}?page=${page}&pageSize=${pageSize}`;
    return from(axios.get(url));
  }

  getOne(endpoint: string, id: any): Observable<any> {
    return from(axios.get(`${this.apiUrl}/${endpoint}/${id}`));
  }

  create(endpoint: string, data: any): Observable<any> {
    return from(axios.post(`${this.apiUrl}/${endpoint}`, data));
  }

  update(endpoint: string, id: any, data: any): Observable<any> {
    return from(axios.put(`${this.apiUrl}/${endpoint}/${id}`, data));
  }

  delete(endpoint: string, id: number): Observable<any> {
    return from(axios.delete(`${this.apiUrl}/${endpoint}/${id}`));
  }
}
