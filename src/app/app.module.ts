import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { NgxSpinnerModule } from 'ngx-spinner';

import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// import { FullscreenService } from './fullscreen.service';

import { AppComponent } from './app.component';
import { ViewBalanceComponent } from './view-balance/view-balance.component';
import { HomeComponent } from './home/home.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { SendEtherComponent } from './send-ether/send-ether.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewBalanceComponent,
    HomeComponent,
    CreateAccountComponent,
    AccountListComponent,
    SendEtherComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      {
        path: 'viewBalance',
        component: ViewBalanceComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'createAccount',
        component: CreateAccountComponent
      },
      {
        path: 'accountList',
        component: AccountListComponent
      },
      {
        path: 'sendEther/:fromAddress',
        component: SendEtherComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ]),
  ],
  providers: [
    // FullscreenService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
