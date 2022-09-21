import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { NouveauSuiviComponent } from './nouveau-suivi/nouveau-suivi.component';
import { AnciensSuivisComponent } from './anciens-suivis/anciens-suivis.component';
import {MatChipsModule,} from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



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
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule
    
    
  ],
  exports: [ RouterModule,MatChipsModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
