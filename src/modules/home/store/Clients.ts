import { Token } from 'domain/protocols'
import { ClientDTO } from 'modules/auth/dto'
import { BaseStore } from 'utils/services/BaseStore'
import { httpRequest } from 'utils/services/httpRequest'

export class ClientsStore extends BaseStore {
  constructor() {
    super('client', 'clients')
  }

  async signup(payload: ClientDTO): Promise<Token> {
    try {
      const { data } = await httpRequest.post('/client/signup', payload)

      return data
    } catch (error) {
      return this.handleError(error)
    }
  }
}
