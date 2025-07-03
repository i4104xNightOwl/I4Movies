import { Component, Input, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';


@Component({
  imports: [
    NzCardModule
  ],
  selector: 'app-movies-item',
  templateUrl: './moviesItem.component.html',
  styleUrls: ['./moviesItem.component.css']
})

export class MoviesItemComponent implements OnInit {
  @Input() imgSrc!: string;
  @Input() originName!: string;
  @Input() name!: string;
  @Input() episodeTotal!: number;
  @Input() episodeCurrent!: number;
  @Input() quality!: string;
  @Input() createdTime!: string;

  year: number;

  ngOnInit() {
    this.year = new Date(this.createdTime).getFullYear();
  }
}
