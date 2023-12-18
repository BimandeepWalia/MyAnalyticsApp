/** Angular Imports */
import { Component, ElementRef, OnInit } from '@angular/core';
import { SupersetService } from 'src/app/Services/superset.service';

@Component({
  selector: 'app-superset',
  templateUrl: './superset.component.html',
  styleUrls: ['./superset.component.css']
})
export class SupersetComponent implements OnInit {
    /**
   * 
   * @param { ElementRef } elementRef 
   * @param { SupersetServiceService } embedService 
   */
    constructor(private elementRef: ElementRef,
      private embedService: SupersetService) { }
  
    ngOnInit(): void {
      this.embedSupersetDashboard();
    }
  
    embedSupersetDashboard(): void {
      const dashboardElement = this.elementRef.nativeElement.querySelector('#dashboard');
  
      if (dashboardElement) {
        this.embedService.embedDashboard().subscribe(
          () => {
            // Adjust the size of the embedded iframe
            const iframe = dashboardElement.querySelector('iframe');
            if (iframe) {
              iframe.style.width = '60%'; // Set the width as needed
              iframe.style.height = '600px'; // Set the height as needed
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    }
}
