import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { IMovies } from '@frontend/models';
import { MoviesItemComponent } from '../moviesItem/moviesItem.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';
import { MoviesDetailsComponent } from '../moviesdetaiils/moviesDetails.component';

@Component({
    imports: [
        CommonModule,
        NzCardModule,
        NzGridModule,
        NzCarouselModule,
        MoviesItemComponent,
        MoviesDetailsComponent
    ],
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CarouselComponent implements OnInit {
    @Input() movies: IMovies[] = [];

    moviesPage: IMovies[] = [];
    selectedMovie: IMovies;
    modalVisible = false;

    breakpoints = {
        375: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1440: {
            slidesPerView: 4,
        },
    };

    ngOnInit() { }

}
