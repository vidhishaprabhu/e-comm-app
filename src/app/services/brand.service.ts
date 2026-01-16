import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../type/brand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  

  http = inject(HttpClient);
  constructor() {}

  getBrands() {
    return this.http.get<Brand[]>(environment.apiUrl+'/brand');
  }
  addBrands(name: string) {
    return this.http.post(environment.apiUrl+'/brand', {
      name: name,
    });
  }
  getBrandsById(id: string) {
    return this.http.get<Brand>(environment.apiUrl+'/brand/' + id);
  }
  updateBrand(id: string, brandData: any) {
    return this.http.put(environment.apiUrl+'/brand/'+id, brandData);
  }
  deleteBrands(id:string){
    return this.http.delete(environment.apiUrl+'/brand/'+id)
  }
}
