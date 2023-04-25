import { ClientModel } from './client'
import { PackageModel } from './package'

export enum TypeNote {
  $10 = 10,
  $50 = 50,
  $100 = 100,
}

export enum OperationStatus {
  CREATED = 'CREATED',
  RESERVED = 'RESERVED',
  DONE = 'DONE',
}

export type OperationModel = {
  amount: number
  status: OperationStatus
  packages: PackageModel[]
  idClient?: string
  client?: ClientModel
  id?: string
  createdAt?: Date
  reservedAt?: Date
  doneAt?: Date
};
