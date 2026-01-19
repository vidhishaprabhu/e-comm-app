import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [MatButtonModule,RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-comm-app';
}
