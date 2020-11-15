// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  FILTERS: ['Free text', 'Birth year', 'Preferred Categories', 'Minimum app rating'],
  FIELDS_TITLES: {
    icon: 'Icon',
    name: 'Name',
    category: 'Category',
    rating: 'Rating',
    externalId: 'External Id',
    id: 'Id',
    installCount: 'Install Count',
    description: 'Description',
    url: 'URL',
    publisher: 'Publisher',
    minAge: 'Min age',
  },
  TABLE_FIELDS: ['icon', 'name', 'category', 'rating', 'externalId'],
  SERVER_URL: 'http://localhost:3000',
  CATEGORIES_URL: 'categories',
  APPLICATIONS_URL: 'applications',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
