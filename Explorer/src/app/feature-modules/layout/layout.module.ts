import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OverviewComponent } from '../administration/overview/overview.component';
import { AdministrationModule } from '../administration/administration.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule,
    AdministrationModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent
  ]
})
export class LayoutModule { }
