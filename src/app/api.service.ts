import { Injectable, inject } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Patch = 'PATCH',
  Put = 'PUT',
  Delete = 'DELETE',
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  root: string = 'http://localhost:3000/api/';
  private _snackBar = inject(MatSnackBar);

  constructor() { }

  async request<T = any>(method: HttpMethod, path: string, data: object, includeBase = true): Promise<AxiosResponse<T>> {
    const token = localStorage.getItem('token');

    const req = await axios.request({
      baseURL: includeBase ? this.root : undefined,
      method,
      data,
      url: path,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      // to make axios not throw errors on http errors
      validateStatus: () => true,
    });

    const strErrorCode = req.status.toString();
    if (strErrorCode[0] == '4' || strErrorCode[0] == '5') {
      try {
        JSON.parse(req.data)
        this._snackBar.open(req.data.message);
      } catch {
        this._snackBar.open('An error occurred.');
      }
    }

    return req;
  }

  get = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Get, path, data, includeBase);
  post = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Post, path, data, includeBase);
  patch = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Patch, path, data, includeBase);
  put = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Put, path, data, includeBase);
  delete = <T = any>(path: string, data: object, includeBase = true) => this.request<T>(HttpMethod.Delete, path, data, includeBase);

  async uploadFile<T = any>(file: File){
    const formData = new FormData();
    formData.append('file', file, file.name);

    return await this.request<T>(HttpMethod.Post, 'http://localhost:3000/upload', formData, false);
  }
}
