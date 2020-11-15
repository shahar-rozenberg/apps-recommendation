export class Application {
  public id: number | undefined;
  public name: string| undefined;
  // maybe should be on environment or enum
  public category: string| undefined;
  public externalId: string| undefined;
  public rating: number| undefined;
  public installCount: number| undefined;
  public description: string| undefined;
  public url: string| undefined;
  public publisher: string| undefined;
  public icon: string| undefined;
  public minAge: number| undefined;

  public setJson(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.category = json.category;
    this.externalId = json.external_id;
    this.rating = json.rating;
    this.installCount = json.install_count;
    this.description = json.description;
    this.url = json.url;
    this.publisher = json.publisher;
    this.icon = json.icon;
    this.minAge = json.min_age;

    return this;
  }
}
