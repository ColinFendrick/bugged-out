export class Bug {
  constructor(
    public id: string = null,
    public title: string = null,
    public status: number = null,
    public severity: number = null,
    public description: string = null,
    public createdBy: string = null,
    public createdDate: number = null,
    public updatedBy?: string,
    public updatedDate?: number,
  ) {}
}
