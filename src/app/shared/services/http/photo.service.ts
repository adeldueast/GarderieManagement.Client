import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  uploadWithProgress(route: string, formData: FormData) {
  return  this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
