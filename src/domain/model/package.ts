import { TypeNote } from './operation'

export enum PackageStatus {
  NEW = 'NEW',
  OPENED = 'OPENED',
  CLOSED = 'CLOSED',
}

export type PackageModel = {
  id?: string
  quantityNote: number
  typeNote: TypeNote
  openedAt?: Date
  closedAt?: Date
  status: PackageStatus
  idOperation?: string
};
