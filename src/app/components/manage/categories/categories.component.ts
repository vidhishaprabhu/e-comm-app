import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import {MatButtonModule, MatIconAnchor, MatIconButton} from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { Category } from '../../../type/category';


@Component({
  selector: 'app-categories',
  standalone:true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['_id', 'name','action'];
  dataSource!: MatTableDataSource<Category>;

  id!:string

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService=inject(CategoryService);
  route=inject(ActivatedRoute);
  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit(){
    this.getServerData();
    

  }
  private getServerData() {
    this.categoryService.getCategories().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result.Category;
      console.log("jj", this.dataSource.data);
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
    this.categoryService.deleteCategories(id).subscribe((result:any)=>{
      alert("Category deleted successfully");
      this.getServerData()
    }) 
  }

}
