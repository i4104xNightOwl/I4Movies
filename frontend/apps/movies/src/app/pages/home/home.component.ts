import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFlexModule } from 'ng-zorro-antd/flex';

import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { IMovies } from '@frontend/models';

@Component({
    imports: [
        NzIconModule,
        NzGridModule,
        NzFlexModule,
        FormsModule,
        NzButtonModule,
        CarouselComponent
    ],
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})

export class HomeComponent {
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


}
