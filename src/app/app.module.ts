import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserListComponent } from './modules/user-list/user-list.component';
import { ListProgressComponent } from './modules/list-progress/list-progress.component';
import { AddUserComponent } from './modules/add-user/add-user.component';
import { UserServiceService } from './services/user-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ListProgressComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
    
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
