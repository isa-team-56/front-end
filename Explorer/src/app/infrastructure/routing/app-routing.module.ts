import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';
import { FindPeopleComponent } from 'src/app/feature-modules/administration/find-people/find-people.component';
import { ActivateAccountComponent } from '../auth/activate-account/activate-account.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'find-people', component: FindPeopleComponent},
  {path: 'activate', component: ActivateAccountComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }