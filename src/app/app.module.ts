import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { NouveauSuiviComponent } from './nouveau-suivi/nouveau-suivi.component';
import { AnciensSuivisComponent } from './anciens-suivis/anciens-suivis.component';

const appRoutes: Routes = [
  {path: "", redirectTo: "/anciens-suivis", pathMatch: "full"},
  {path: "mon-profil", component: MonProfilComponent},
  {path: "nouveau-suivi", component: NouveauSuiviComponent},
  {path: "anciens-suivis", component: AnciensSuivisComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MonProfilComponent,
    NouveauSuiviComponent,
    AnciensSuivisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [ RouterModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
