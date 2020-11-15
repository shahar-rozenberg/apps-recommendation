import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Application} from '../models/application.model';
import {ApplicationsService} from '../services/applications.service';
import {MatDialog} from '@angular/material/dialog';
import {ApplicationDetailsComponent} from '../application-details/application-details.component';

@Component({
  selector: 'app-application-table',
  templateUrl: './application-table.component.html',
  styleUrls: ['./application-table.component.less']
})
export class ApplicationTableComponent implements OnInit {
  private _displayedColumns: { id: string, text: string }[] = [];
  private _apps: Application[] = [];
  public isFirstQuery: boolean = true;
  public readonly ICON_FIELD: string = 'icon';
  public readonly NOT_FOUND_MESSAGE: string = 'No records found. Please enter filters and apply.';
  public isLoading: boolean = false;

  constructor(private _appService: ApplicationsService, private _dialog: MatDialog) {
    this._appService.applicationSubject.subscribe((applications: Application[]) => {
      this._apps = applications;
      this.isFirstQuery = false;
    });
    this._appService.awaitingResponse.subscribe((awaitingResponse: boolean) => {
      this.isLoading = awaitingResponse;
    });
  }

  get displayedColumns(): { id: string, text: string }[] {
    return this._displayedColumns;
  }

  get apps(): Application[] {
    return this._apps;
  }

  public initTableColumns(): void {
    const tableFields: string[] = environment.TABLE_FIELDS;
    const fieldsTitles: any = environment.FIELDS_TITLES;

    tableFields.forEach((field: string) => {
      this._displayedColumns.push({id: field, text: fieldsTitles[field]});
    });

  }

  public getColumnsIds() {
    return this._displayedColumns.map(col => col.id);
  }

  public openDetailsPopup(clickedApp: Application) {
    this._dialog.open(ApplicationDetailsComponent, {
      data: {
        app: clickedApp
      },
      width: '45vw',
      height: '95vh'
    });
  }

  ngOnInit(): void {
    this.initTableColumns();
  }
}
