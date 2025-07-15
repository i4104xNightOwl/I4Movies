import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CommonModule } from '@angular/common';

@Component({
    imports: [
        CommonModule,
        NzGridModule,
    ],
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})

export class FooterComponent {
}
