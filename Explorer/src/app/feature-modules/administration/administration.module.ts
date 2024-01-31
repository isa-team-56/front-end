import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentFormComponent } from './equipment-form/equipment-form.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { FindPeopleComponent } from './find-people/find-people.component';
import { FullCalendarModule } from '@fullcalendar/angular'
import { DatePipe } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { ReservationsViewComponent } from './reservations-view/reservations-view.component';



@NgModule({
  declarations: [
    EquipmentFormComponent,
    EquipmentComponent,
    ProfileComponent,
    ProfileFormComponent,
    FindPeopleComponent,
    OverviewComponent,
    ReservationsViewComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,

  ],
  exports: [
    EquipmentComponent,
    EquipmentFormComponent,
    ProfileFormComponent,
    ProfileComponent,
    FindPeopleComponent,
    OverviewComponent,
    ReservationsViewComponent
  ],
  providers:
  [
    DatePipe
  ]
})
export class AdministrationModule { }
