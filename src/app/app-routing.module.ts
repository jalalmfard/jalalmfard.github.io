import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { PosterComponent } from './poster/poster.component';
import { LogoComponent } from './logo/logo.component';
import { FurnituredesignComponent } from './furnituredesign/furnituredesign.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ArtreviewsComponent } from './artreviews/artreviews.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'architecture', component: ArchitectureComponent },

  { path: 'artreviews', component: ArtreviewsComponent },

  { path: 'artworks', component: ArtreviewsComponent },

  { path: 'exhibitions', component: ExhibitionsComponent },

  { path: 'furnituredesign', component: FurnituredesignComponent },

  { path: 'logo', component: LogoComponent },

  { path: 'poster', component: PosterComponent },

  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
