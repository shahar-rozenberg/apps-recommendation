import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Application} from '../models/application.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private _serverUrl: string = environment.SERVER_URL;
  private _applicationSubject: Subject<Application[]> = new Subject<Application[]>();
  private _awaitingResponse: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient) {
  }

  get applicationSubject(): Observable<Application[]> {
    return this._applicationSubject.asObservable();
  }

  get awaitingResponse(): Observable<boolean> {
    return this._awaitingResponse.asObservable();
  }

  public getCategories() {
    return this._httpClient.get(this._serverUrl + '/' + environment.CATEGORIES_URL);
  }

  public getRecommendedApps(filtersData: any) {
    this._awaitingResponse.next(true);
    let httpParams = new HttpParams();
    Object.keys(filtersData).forEach((key: string) => {
      httpParams = httpParams.set(key, filtersData[key]);
    });

    return this._httpClient.get(this._serverUrl + '/' + environment.APPLICATIONS_URL, {params: httpParams}).
    subscribe((dataJson: any) => {
      this._awaitingResponse.next(false);
      this.dispatchApplications(dataJson);
    });
  }

  private dispatchApplications(dataJson: any): void {
    const recommendedApps: Application[] = dataJson.map((app: any) => new Application().setJson(app));
    this._applicationSubject.next(recommendedApps);
  }
}
