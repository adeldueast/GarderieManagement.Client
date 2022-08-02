import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  public urlAddress: string = environment.production
    ? environment.productionUrlAddress
    : environment.developmentUrlAddress;

  public urlAdressPhoto: string = `${this.urlAddress}/Photos/sm/`;

  
  constructor() {}
}
