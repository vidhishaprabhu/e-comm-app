import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './components/manage/categories/categories.component';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-comm-app';
}
