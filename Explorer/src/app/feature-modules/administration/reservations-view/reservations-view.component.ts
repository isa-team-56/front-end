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
  constructor(private authService: AuthService,private service: AdministrationService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getReservations();
  }

  getReservations(): void {
    this.service.getReservations().subscribe({
      next: (result: PagedResults<Reservation>) => {
        this.reservationData = result.results.filter(reservation => reservation.userId === this.user.id);
      
       },
      error: () => {
      }
    })
  }


}
