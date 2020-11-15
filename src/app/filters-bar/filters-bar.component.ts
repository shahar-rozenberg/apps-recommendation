import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {environment} from '../../environments/environment';
import {ApplicationsService} from '../services/applications.service';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.less']
})
export class FiltersBarComponent {

  private _filtersForm;
  private _filters;
  private _categories: any;

  constructor(private formBuilder: FormBuilder, private _appService: ApplicationsService) {
    this._appService.getCategories().subscribe((jsonCategories) => {
      this._categories = jsonCategories;
    });

    this._filters = environment.FILTERS;
    this._filtersForm = this.formBuilder.group({
      freeText: '',
      birthYear: '',
      preferredCategories: '',
      minimumAppRating: ''
    });
  }

  get filtersForm() {
    return this._filtersForm;
  }

  get filters() {
    return this._filters;
  }

  get categories() {
    return this._categories;
  }

  public onSubmit(filtersData: any) {
    this._appService.getRecommendedApps(filtersData);
  }
}
