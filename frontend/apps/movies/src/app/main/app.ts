import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  imports: [RouterModule, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  protected title = 'movies';
}
