import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Brand } from '../../../type/brand';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatButtonModule, MatIconAnchor, MatIconButton} from '@angular/material/button';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brands',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,RouterLink,MatButtonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  displayedColumns: string[] = ['_id', 'name','action'];
  dataSource!: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandService=inject(BrandService);
  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(){
    this.getServerData();
  }

  private getServerData() {
    this.brandService.getBrands().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result.Brand;
      console.log("bb", this.dataSource.data);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  delete(id:string){
    this.brandService.deleteBrands(id).subscribe((result:any)=>{
      console.log(result);
      alert("Brand deleted successfully");
      this.getServerData();
    })

  }



}
