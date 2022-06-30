import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  createChild(route: string, createChild_request: any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createChild_request
    );
  }

  updateChild(route: string, createChild_request: any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createChild_request
    );
  }

  getChildren(route: string) {
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }
  
  getChild(route: string) {
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
