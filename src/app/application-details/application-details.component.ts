import {Component, Inject} from '@angular/core';
import {Application} from '../models/application.model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.less']
})
export class ApplicationDetailsComponent {

  private _popupTitleFields: string[] = ['icon', 'name'];

  public recommendedApp: Application;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.recommendedApp = data.app;
  }

  public getExtendDetails() {
    const fields: any = environment.FIELDS_TITLES;
    return Object.entries(fields).filter(field => !this._popupTitleFields.includes(field[0]));
  }
}
