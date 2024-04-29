import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class TripDataService {

  constructor(private http: HttpClient, 
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips`;
  private header = {
    headers: new HttpHeaders({'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`})
  }

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    
    return this.http.post<Trip>(this.tripUrl, formData, this.header);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData, this.header);
  }

  private handleError(err: any): Promise<any> {
    console.error('Something has gone wrong', err);
    return Promise.reject(err.message || err);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  private async makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    return await firstValueFrom(this.http.post(url, user))
      .catch(this.handleError);
  }
}
