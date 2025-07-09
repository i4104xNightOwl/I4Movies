import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../shared/layouts/footer/footer.component";
import { HeaderComponent } from '../shared/layouts/header/header.component';

@Component({
    imports: [RouterModule, FooterComponent, HeaderComponent],
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
})

export class App {
    protected title = 'movies';
}
