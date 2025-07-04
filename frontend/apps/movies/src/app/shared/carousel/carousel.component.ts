import { Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IMovies } from '@frontend/models';
import { MoviesItemComponent } from '../moviesItem/moviesItem.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
    imports: [
        NzCardModule,
        NzGridModule,
        MoviesItemComponent
    ],
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css']
})

export class CarouselComponent {
    @Input() movies: IMovies[] = [];
}
