import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HelpbotServiceService, customer_complaint } from 'src/app/common/help-bot/helpbot-service.service';


@Component({
  selector: 'app-admin-show-complains',
  templateUrl: './admin-show-complains.component.html',
  styleUrls: ['./admin-show-complains.component.css']
})
export class AdminShowComplainsComponent implements OnInit {

  complains!: customer_complaint[];
  
  constructor(private router: Router, private service: HelpbotServiceService) {
    
  }
  
  ngOnInit(): void {
    this.getallcomplains();
  }

  dataSource: any;

  getallcomplains() {
    this.service.getallComplain().subscribe(data => {
      this.complains = data;
      console.log(data);

      this.dataSource = new MatTableDataSource(this.complains);
      this.dataSource.paginator = this.paginator;
    })
  }

  displayedColumns: string[] = ['ID', 'Email', 'Complains', 'Date'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  to_admin() {
    this.router.navigate(['adminhome'])
  }
}

