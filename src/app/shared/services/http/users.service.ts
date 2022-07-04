import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  getAllStaff(route:string){
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  getAllGuardians(route:string){
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  getAllChildsGuardians(route:string){
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }


  createGuardian(route:string,guardian_request:any){
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      guardian_request
    );
  }

  assignGuardian(route:string,guardian_request:any){
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      guardian_request
    );
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
