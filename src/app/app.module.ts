import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { NouveauSuiviComponent } from './nouveau-suivi/nouveau-suivi.component';
import { AncienSuivisComponent } from './ancien-suivis/ancien-suivis.component';

const appRoutes: Routes = [
  {path: "", redirectTo: "/ancien-suivis", pathMatch: "full"},
  {path: "mon-profil", component: MonProfilComponent},
  {path: "nouveau-suivi", component: NouveauSuiviComponent},
  {path: "ancien-suivis", component: AncienSuivisComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MonProfilComponent,
    NouveauSuiviComponent,
    AncienSuivisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [ RouterModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
