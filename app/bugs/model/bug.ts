import { STATUS, SEVERITY } from '../../shared/constant/constants';

export class Bug {
  constructor(
    public id: string = null,
    public title: string = null,
    public status: number = STATUS.Logged,
    public severity: number = SEVERITY.Severe,
    public description: string = null,
    public createdBy: string = null,
    public createdDate: number = null,
    public updatedBy?: string,
    public updatedDate?: number,
  ) {}
}
