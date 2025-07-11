import { Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IMovies } from '@movies/interfaces/models/movies.models';

@Component({
    imports: [
        NzCardModule,
    ],
    selector: 'app-movies-item',
    templateUrl: './moviesItem.component.html',
    styleUrls: ['./moviesItem.component.css']
})

export class MoviesItemComponent implements OnInit {
    @Input() movie!: IMovies;

    year: number;

    ngOnInit() {
        this.year = new Date(this.movie.createdTime).getFullYear();
    }
}
