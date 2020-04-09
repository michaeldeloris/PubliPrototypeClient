import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { PublicationsComponent } from './publications/publications.component';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { Routes, RouterModule } from '@angular/router';
import { PublicationEditComponent } from './publications/publication-edit/publication-edit.component';
import { PublicationDetailsComponent } from './publications/publication-details/publication-details.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthRouteGuardService } from './services/auth-route-guard.service';

const routes: Routes = [
  {path: "", component: PublicationsComponent},
  {path: "publication", component: PublicationDetailsComponent},
  {path: "publication/add", component: PublicationEditComponent, canActivate : [AuthRouteGuardService]},
  {path: "publication/edit", component: PublicationEditComponent, canActivate : [AuthRouteGuardService]},
  {path: "users", component: UsersComponent, canActivate : [AuthRouteGuardService]},
  {path: "users/edit", component: UserEditComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    FooterComponent,
    PublicationsComponent,
    PublicationEditComponent,
    PublicationDetailsComponent,
    MessageEditComponent,
    UsersComponent,
    UserEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
