import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}


  getAllGroups(route: string) {
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  getGroupById(route: string) {
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  
  deleteGroup(route: string) {
    return this.http.delete<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),{}
    );
  }


  createGroup(route:string, createGroup_request:any){
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createGroup_request
    );
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
