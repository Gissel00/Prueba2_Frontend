import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

const routes: Routes = [
  /*{ path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }*/

  { path: '', component:MenuComponent,
  children:[
    {path: 'welcome', component:WelcomeComponent},
    {path: 'playlist', component:PlaylistComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
