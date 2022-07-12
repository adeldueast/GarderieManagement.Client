import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  arrivedAt(route: string) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      {}
    );
  }
  leftAt(route: string) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      {}
    );
  }

  createAbsence(route: string,createAbsenceRequest : any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createAbsenceRequest
    );
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
