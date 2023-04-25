import { BaseStore } from 'utils/services/BaseStore'

export class OperationsStore extends BaseStore {
  constructor() {
    super('operation', 'operations')
  }
}
