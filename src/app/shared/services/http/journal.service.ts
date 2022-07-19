import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  getChildsJournal(route: string) {
    return this.http.get<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress)
    );
  }

  createChildJournal(route: string, createJournal_request: any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createJournal_request
    );
  }

  
  createGroupedJournals(route: string, createGroupedJournals_request: any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createGroupedJournals_request
    );
  }


  

  updateChildJournal(route: string, updateJournal_request: any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      updateJournal_request
    );
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
