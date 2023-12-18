import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { Observable, catchError, switchMap, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupersetService {
   /**
   * API URL of Superset to send request
   */
   private apiUrl = 'http://localhost:8088/api/v1/security';

   /**
    * @param {HttpClient} http Http Client to send requests.
    */
   constructor(private http: HttpClient) { }
 
   /**
    * 
    * @returns { access token }
    */
   private fetchAccessToken(): Observable<any> {
     const body = {
       "username": "admin",
       "password": "admin",
       "provider": "db",
       "refresh": true
     };
 
     const headers = new HttpHeaders({ "Content-Type": "application/json" });
 
     return this.http.post<any>(`${this.apiUrl}/login`, body, { headers });
   }
 
   /**
    * 
    * @returns { guest token } using @param { accessToken }
    */
   private fetchGuestToken(accessToken: any): Observable<any> {
     const body = {
       "resources": [
         {
           "type": "dashboard",
           "id": "93a324ea-132d-4b58-a8ab-c7d4b37f68b1",
         }
       ],
       /**
        * rls: Row Level Security, this differs for client to client ,like what to show each client
        */
       "rls": [],
       "user": {
         "username": "guest",
         "first_name": "Guest",
         "last_name": "User",
       }
     };
 
     const acc = accessToken["access_token"]; //accessToken is an object in which there are two tokens access_token and refresh_token ,out of which we just need to send access_token to get guest_token
     const headers = new HttpHeaders({
       "Content-Type": "application/json",
       "Authorization": `Bearer ${acc}`,
     });
     
     //guest_token URL should end with forward_slash(/)
     return this.http.post<any>(`${this.apiUrl}/guest_token/`, body, { headers });
   }
   /**
    * 
    * @returns { guest Token }
    */
   getGuestToken(): Observable<any> {
     return this.fetchAccessToken().pipe(
       catchError((error) => {
         console.error(error);
         return error;
       }),
       switchMap((accessToken: any) => this.fetchGuestToken(accessToken))
     );
   }
   /**
    * 
    * @returns { dashboard }
    */
   embedDashboard(): Observable<void> {
     return new Observable((observer) => {
       this.getGuestToken().subscribe(
         (token) => {
           embedDashboard({
             id: '93a324ea-132d-4b58-a8ab-c7d4b37f68b1', // Replace with your dashboard ID
             supersetDomain: 'http://localhost:8088',
             mountPoint: document.getElementById('dashboard') as HTMLElement,
             fetchGuestToken: () => token["token"],
             dashboardUiConfig: {
               hideTitle: true,
               hideChartControls: true,
               hideTab: true,
             },
           });
           observer.next();
           observer.complete();
         },
         (error) => {
           observer.error(error);
         }
       );
     });
   }
}
