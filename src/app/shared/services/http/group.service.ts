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

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
