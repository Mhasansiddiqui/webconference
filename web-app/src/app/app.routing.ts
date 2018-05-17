import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule ,Router } from '@angular/router';

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

import { AuthGuardService } from './_guards/auth-guard.service'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ActivationComponent } from './_directives/activation/activation.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetEmailComponent } from './forget-email/forget-email.component';
import { User } from './_model/user';


import { ViewProfileComponent } from './view-profile/view-profile.component';
const routes: Routes = [

  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'user', component: UserProfileComponent },
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'table', component: TablesComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  
  { path: '', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'forgetPassowrd', component: ForgetPasswordComponent },
  { path: 'forgetEmail', component: ForgetEmailComponent },
  { path: 'setting', component: UserComponent },
  { path: '**', component: ViewProfileComponent, canActivate: [AuthGuardService] },
  

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {

      console.log('error',this.router.url)
      
      this.router.navigate(['']); // or redirect to default route
    }
  }
}
