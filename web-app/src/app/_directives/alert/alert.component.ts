import { Component, OnInit } from '@angular/core';
 
import { AlertServcieService } from '../../_services/alert-servcie.service';
@Component({
  selector: 'app-alert',
  moduleId: module.id,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
 
  constructor(private alertService: AlertServcieService) { }

  ngOnInit() {
      this.alertService.getMessage().subscribe(message => { this.message = message; });
  }
 
}
