import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IMovies } from '@movies/interfaces/models/movies.models';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from "../../shared/carousel/carousel.component";
import videojs from 'video.js';

@Component({
    imports: [
        CommonModule,
        NzGridModule,
        NzCardModule,
        NzButtonModule,
        NzIconModule,
        CarouselComponent
    ],
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
    @ViewChild('videoElement', { static: true }) videoElement: ElementRef;
    player: any;

    movies: IMovies = {
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
    };
    ngOnInit() {
        this.player = videojs(this.videoElement.nativeElement, {
            sources: [{
                src: 'https://vip.opstream15.com/20230329/36754_5a2f962a/index.m3u8',
                type: 'application/x-mpegURL'
            }],
            controls: true,
            preload: 'auto',
            responsive: true,
            fluid: true,
        });
    }

}
