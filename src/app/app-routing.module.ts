import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArchitectureComponent } from './architecture/architecture.component';
import { PosterComponent } from './poster/poster.component';
import { LogoComponent } from './logo/logo.component';
import { FurnituredesignComponent } from './furnituredesign/furnituredesign.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { ArtreviewsComponent } from './artreviews/artreviews.component';
import { ArchitectureDetailComponent } from './architecture/architecturedetail/architecturedetail.component';
import { ArtworksComponent } from './artworks/artworks.component';
import { ArtworksDetailComponent } from './artworks/artworksdetail/artworksdetail.component';
import { ExhibitionsDetailComponent } from './exhibitions/exhibitionsdetail/exhibitionsdetail.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'architecture', component: ArchitectureComponent },

  { path: 'architecture/:id', component: ArchitectureDetailComponent },

  { path: 'artreviews', component: ArtreviewsComponent },

  { path: 'artworks', component: ArtworksComponent },
  
  { path: 'artworks/:id', component: ArtworksDetailComponent },

  { path: 'exhibitions', component: ExhibitionsComponent },
  
  { path: 'exhibitions/:id', component: ExhibitionsDetailComponent },



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
