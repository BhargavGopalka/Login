export class Location {
  private _id: number;
  private _country_id: number;
  private _postal_code: number;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get country_id(): number {
    return this._country_id;
  }

  set country_id(value: number) {
    this._country_id = value;
  }

  get postal_code(): number {
    return this._postal_code;
  }

  set postal_code(value: number) {
    this._postal_code = value;
  }
}
