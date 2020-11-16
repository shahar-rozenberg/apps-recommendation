import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Application} from '../models/application.model';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private _serverUrl: string = environment.SERVER_URL;
  private _applicationSubject: Subject<Application[]> = new Subject<Application[]>();
  private _categoriesSubject: Subject<any> = new Subject<any>();
  private _awaitingResponse: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _httpClient: HttpClient, private _snackBar: MatSnackBar) {
  }

  get applicationSubject(): Observable<Application[]> {
    return this._applicationSubject.asObservable();
  }

  get categoriesSubject(): Observable<any> {
    return this._categoriesSubject.asObservable();
  }

  get awaitingResponse(): Observable<boolean> {
    return this._awaitingResponse.asObservable();
  }

  public getCategories() {
    return this._httpClient.get(this._serverUrl + '/' + environment.CATEGORIES_URL)
      .subscribe((categories) => {
        this._categoriesSubject.next(categories);
      }, (error) => this._snackBar.open('Oops.. something went wrong in the server')
    );
  }

  public getRecommendedApps(filtersData: any) {
    this._awaitingResponse.next(true);
    let httpParams = new HttpParams();
    Object.keys(filtersData).forEach((key: string) => {
      httpParams = httpParams.set(key, filtersData[key]);
    });

    return this._httpClient.get(this._serverUrl + '/' + environment.APPLICATIONS_URL, {params: httpParams}).subscribe((dataJson: any) => {
        this.dispatchApplications(dataJson);
      },
      (error) => {
        this._snackBar.open('Oops.. something is wrong. Please try again');
      }).add(() => {
      this._awaitingResponse.next(false);
    });
  }

  private dispatchApplications(dataJson: any): void {
    const recommendedApps: Application[] = dataJson.map((app: any) => new Application().setJson(app));
    this._applicationSubject.next(recommendedApps);
  }
}
