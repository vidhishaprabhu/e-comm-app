import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../type/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  constructor() {}

  getCategories() {
    return this.http.get<Category[]>('http://localhost:8000/category');
  }
  addCategories(name: string) {
    return this.http.post('http://localhost:8000/category', {
      name: name,
    });
  }
  getCategoriesById(id: string) {
    return this.http.get<Category>('http://localhost:8000/category/' + id);
  }
  updateCategory(id: string, categoryData: any) {
    return this.http.put(`http://localhost:8000/category/${id}`, categoryData);
  }
  deleteCategories(id:string){
    return this.http.delete(`http://localhost:8000/category/${id}`)
  }
}
