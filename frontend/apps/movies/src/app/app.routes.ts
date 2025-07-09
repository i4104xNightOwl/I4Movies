import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { PlayerComponent } from './pages/player/player.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'details',
        component: DetailsComponent
    },
    {
        path: 'player',
        component: PlayerComponent
    },
];
