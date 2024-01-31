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
  selector: 'xp-reservations-view',
  templateUrl: './reservations-view.component.html',
  styleUrls: ['./reservations-view.component.css']
})
export class ReservationsViewComponent implements OnInit{
  user: User;
  reservationData: Reservation[]=[];
  selectedReservation:Reservation | undefined;
  appointmentsData: Appointment[] = [];
  equipmentData: Equipment[] = [];
  companyData: Company[] = [];
  constructor(private authService: AuthService,private service: AdministrationService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getAppointments();
    this.getEquipment();
    this.getCompanies();
    this.getReservations();
  }

  getAppointments(): void {
    this.service.getAppointments().subscribe({
      next: (result: PagedResults<Appointment>) => {
        this.appointmentsData = result.results;
      },
      error: () => {
        
      }
    });
  }

  getEquipment(): void {
    this.service.getEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.equipmentData = result.results;
      },
      error: () => {
        
      }
    });
  }

  
  getCompanies(): void {
    this.service.getCompanies().subscribe({
      next: (result: PagedResults<Company>) => {
        this.companyData = result.results;
      },
      error: () => {
        
      }
    });
  }

  getCompanyDetails(companyId: number): Company | undefined {
    return this.companyData.find(company => company.id === companyId);
  }

  getAppointmentDetails(appointmentId: number): Appointment | undefined {
    return this.appointmentsData.find(appointment => appointment.id === appointmentId);
  }

  getEquipmentDetails(equipmentId: number): Equipment | undefined {
    return this.equipmentData.find(equipment => equipment.id === equipmentId);
  }

  getReservations(): void {
    this.service.getReservations().subscribe({
      next: (result: PagedResults<Reservation>) => {
        this.reservationData = result.results.filter(reservation => reservation.userId === this.user.id && reservation.state==="in progress");
      
       },
      error: () => {
      }
    });
  }

  cancelReservation(r: Reservation):void{
    this.selectedReservation=r;
    if(this.selectedReservation.id!=undefined){
    this.service.cancelReservation(this.selectedReservation.id).subscribe({
      next: (result:any) => {
        alert("Appointment successfully canceled!");
        
      },
      error: () => {
      }
    })};
  }


}
