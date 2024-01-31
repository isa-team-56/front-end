import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Equipment, Type } from '../model/equipment.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Company } from '../model/company.model';
import { Appointment } from '../model/appointment.model';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Reservation } from '../model/reservation.model';

@Component({
  selector: 'xp-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {

  equipment: Equipment[] = [];
  filteredEquipment: Equipment[] = [];
  selectedEquipment: Equipment ;
  shouldRenderEquipmentForm: boolean = false;
  shouldEdit: boolean = false;
  searchTerm: string = ''; 
  companiesForSelectedEquipment: Company[] = []; 
  appointmentsForSelectedCompany: Appointment[] = [];
  selectedCompany: Company;
  viewAppoints:boolean;
  selectedAppointment:Appointment | undefined;
  user: User;
  reservation: Reservation;
  
 
  
  constructor(private authService: AuthService,private service: AdministrationService) { }


  selectedType: Type | '' = '';
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getEquipment();
  }

  deleteEquipment(id: number): void {
    this.service.deleteEquipment(id).subscribe({
      next: () => {
        this.getEquipment();
      },
    })
  }

  getEquipment(): void {
    this.service.getEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.equipment = result.results;
        this.applySearchFilter(); // Apply search filter when equipment is loaded
      },
      error: () => {
      }
    })
  }

  getTypeString(type: Type): string {
    switch (type) {
      case Type.machine:
        return 'Machine';
      case Type.sensor:
        return 'Sensor';
      case Type.monitor:
        return 'Monitor';
      case Type.table:
        return 'Table';
      default:
        return '';
    }
  }

  applySearchFilter(): void {
    this.filteredEquipment = this.equipment.filter(eq =>
      (eq.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedType === '' || eq.type.toString() === this.selectedType.toString()))
    );
  }
  
  filterEquipment(): void {
    this.applySearchFilter();
  }

  getCompaniesForEquipment(eq: Equipment): void {
    this.selectedEquipment = eq;
    this.service.getCompaniesByEquipment(eq).subscribe({
      next: (result: any) => {
        this.companiesForSelectedEquipment = result;
        this.viewAppoints=false;
      },
      error: (error) => {
        console.error('Error fetching companies:', error);
      }
    });
  }

  viewAppointments(company: Company): void {
    this.selectedCompany = company;
    
    this.service.getAppointmentsByCompany(company).subscribe({
      next: (result:any) => {
        this.appointmentsForSelectedCompany = result;
        this.viewAppoints=true;
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }

  addReservation(appId: number): void{
    console.log('appId before HTTP request:', appId);
    const reservation: Reservation = {
      
      reservedAppointment: appId|| -1,
      userId: this.user.id || -1,
      state: "in progress",
      equipmentId:this.selectedEquipment.id||-1,
      companyId:this.selectedCompany.id||-1
      
    };
  
    this.service.createReservation(reservation).subscribe({
      next: () => { }
    });
  }

  changeReservedStatus(appointment: Appointment): void {
    this.selectedAppointment = appointment;
  if(appointment.id!=undefined){
    this.service.changeReservedStatus(appointment.id).subscribe({
      next: (result: any) => {
        this.viewAppoints = false; 
        if(appointment.id!=undefined){
        this.addReservation(appointment.id)
        alert("Appointment successfully reserved!")
      }},
      error: (error) => {
        console.error('Error changing reservation status:', error);
        
      }
  });}
  }

 
}