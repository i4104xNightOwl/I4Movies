import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { MoviesItemComponent } from '../../shared/moviesItem/moviesItem.component';

@Component({
  imports: [
    NzIconModule,
    NzGridModule,
    NzFlexModule,
    FormsModule,
    NzButtonModule,
    MoviesItemComponent
  ],    
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
}
