export class Bug {
  constructor(
    public id: string = null,
    public title: string = null,
    public status: number = 1,
    public severity: number = 1,
    public description: string = null,
    public createdBy: string = null,
    public createdDate: number = null,
    public updatedBy?: string,
    public updatedDate?: number,
  ) {}
}
