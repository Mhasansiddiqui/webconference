import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConnectionBackend, HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';


import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VisitComponent } from './visit/visit.component';
import { AlertComponent } from './_directives/alert/alert.component';


import { AuthGuardService } from './_guards/auth-guard.service';


import { JwtInterceptorService } from './_helpers/jwt-interceptor.service';
import { AlertServcieService } from './_services/alert-servcie.service';
import { AuthenticationServiceService } from './_services/authentication-service.service';
import { UserServiceService } from './_services/user-service.service';


import { FakeBackendService } from './_helpers/fake-backend.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ActivationComponent } from './_directives/activation/activation.component';
import { EqualValidator } from './_directives/equal-validator.directive';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetEmailComponent } from './forget-email/forget-email.component';

/* import { Ng2TableModule } from 'ng2-table/ng2-table'; */
/* import { PaginationModule, TabsModule,PaginationConfig } from 'ng2-bootstrap/ng2-bootstrap';  */
/* import { Ng2SmartTableModule } from 'ng2-smart-table'; */


import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
//api
import { DataTableModule } from 'primeng/datatable';
import { DropdownModule, ContextMenuModule, DialogModule, MenuModule, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieService } from 'ngx-cookie-service';
import { NoopInterceptor } from './_services/custom-http.service';

import {GrowlModule} from 'primeng/growl';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {MessageService} from 'primeng/components/common/messageservice';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    SignInComponent,
    SignUpComponent,
    VisitComponent,
    AlertComponent,
    UserProfileComponent,
    ActivationComponent,
    EqualValidator,
    ForgetPasswordComponent,
    ForgetEmailComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    LbdModule,
    AccordionModule,
    DataTableModule,
    DropdownModule,
    BrowserAnimationsModule,
    MenuModule,
    ContextMenuModule,
    ButtonModule,
    ConfirmDialogModule,
    GrowlModule

  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    CookieService,
    ConfirmationService,
    AuthGuardService,
    AlertServcieService,
    HttpClient,
    AuthenticationServiceService,
    UserServiceService,


    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
