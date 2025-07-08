import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CarouselComponent } from "../../shared/carousel/carousel.component";
import { IMovies } from '@frontend/models';

@Component({
    imports: [
        NzGridModule,
        NzCardModule,
        NzButtonModule,
        NzIconModule,
        CarouselComponent
    ],
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    movies: IMovies[] = [
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
        {
            "id": 1,
            "name": "Người Cát (Phần 2)",
            "slug": "nguoi-cat-phan-2",
            "originName": "Người Cát (Phần 2)",
            "status": "Đang chính thuật",
            "type": "Phim bo",
            "category": [
                {
                    "id": 1,
                    "name": "Phim bo",
                    "slug": "phim-bo"
                }
            ],
            "thumbUrl": "/nguoi-cat-phan-2-poster.jpg",
            "posterUrl": "/nguoi-cat-phan-2-poster.jpg",
            "episodeCurrent": 1,
            "episodeTotal": 1,
            "quality": "HD",
            "createdTime": "2022-12-01T00:00:00.000Z"
        },
    ];


    constructor() { }

    ngOnInit() {
    }

}
