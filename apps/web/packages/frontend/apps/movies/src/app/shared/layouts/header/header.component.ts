import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
    imports: [
        CommonModule,
        NzGridModule,
    ],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
}
