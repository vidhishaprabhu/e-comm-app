import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconAnchor, MatIconButton} from '@angular/material/button';
import { Product } from '../../../type/product';
import { ProductsService } from '../../../services/products.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-products',
  standalone:true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatIconModule,MatButtonModule,RouterLink,CommonModule,MatTooltipModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['_id', 'name', 'shortDescription','description', 'Price','discount','images','categoryId','action'];
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService=inject(ProductsService)
  constructor() {
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(){
    this.getServerDate();
    
  }

  private getServerDate() {
    this.productService.getProducts().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result;
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
    this.productService.deleteProducts(id).subscribe((result:any)=>{
      alert("Product deleted successfully");
      this.getServerDate();
    })

  }

}
