import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Appointment } from '../model/appointment.model';
import { AdministrationService } from '../administration.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    events: [], // Postavljamo prazno polje za događaje
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek,dayGridYear,timeGridMonth',
    },
    views: {
      dayGridMonth: {
        titleFormat: { month: 'long', year: 'numeric' },
      },
      timeGridWeek: {
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
      },
      dayGridYear: {
        type: 'dayGridYear',
      },
      timeGridMonth: {
        titleFormat: { year: 'numeric', month: 'long' },
      },
    },
  };

  user: User;
  constructor(private authService: AuthService, private service: AdministrationService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    const date = new Date();
  
    this.authService.user$.subscribe(user => {
      this.user = user;
  
      
      this.fetchAppointments();
    });
  }

  fetchAppointments(): void {
    this.service.getAppointments().subscribe(
      response => {
        console.log('Fetched response:', response);
  
        const appointments = response?.results || [];
  
       
        //const filteredAppointments = appointments.filter(appointment => appointment.adminId === this.user.id);
        const filteredAppointments = appointments;
  
        console.log('Filtered appointments:', filteredAppointments);
  
        const calendarEvents = filteredAppointments.map(appointment => ({
          start: this.datePipe.transform(appointment.start, 'yyyy-MM-ddTHH:mm:ss'),
          title: `${appointment.duration} minutes`
        }));
  
        this.calendarOptions.events = calendarEvents as unknown as EventInit[];
  
        console.log('Mapped events:', this.calendarOptions.events);
      },
      // ...
    );
  }
  
}

