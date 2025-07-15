import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { IMovies } from '@movies/interfaces/models/movies.models';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
    imports: [
        NzCardModule,
        NzModalModule,
        NzIconModule,
        NzGridModule,
        NzButtonModule
    ],
    selector: 'app-movies-details',
    templateUrl: './moviesDetails.component.html',
    styleUrls: ['./moviesDetails.component.css']
})

export class MoviesDetailsComponent {
    @Input() movie!: IMovies;
    @Input() isVisible = false;
    @Output() isVisibleChange = new EventEmitter<boolean>();

    handleCancel(): void {
        this.isVisible = false;
        this.isVisibleChange.emit(false);
    }

    year: number;
}
