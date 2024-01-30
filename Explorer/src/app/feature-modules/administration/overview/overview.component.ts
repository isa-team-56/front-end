import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Equipment, Type } from '../model/equipment.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Company } from '../model/company.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';

@Component({
  selector: 'xp-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
  equipments: Equipment[] = [];
  companies: Company[] = [];
  user: User;
 
  
  constructor(private authService: AuthService,private service: AdministrationService) { }

  selectedType: Type | '' = '';
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getEquipment();
    this.getCompanies();
  }

  

  getEquipment(): void {
    this.service.getEquipment().subscribe({
      next: (result: PagedResults<Equipment>) => {
        this.equipments = result.results;
       },
      error: () => {
      }
    })
  }

  getCompanies(): void {
    this.service.getCompanies().subscribe({
      next: (result: PagedResults<Company>) => {
        this.companies = result.results;
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

}
