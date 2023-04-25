import { api, httpRequest } from './httpRequest'

type QueryParams = object

export class BaseStore {
  private readonly collectionURL: string

  constructor(
    readonly entityName: string,
    private readonly collectionName: string
  ) {
    this.entityName = entityName
    this.collectionName = collectionName
    this.collectionURL = `${api}/${this.entityName}/${this.collectionName}`
  }

  // eslint-disable-next-line class-methods-use-this
  handleError(error: any): never {
    // TODO: Implement error handling.
    throw error
  }

  async fetchAll<Response>(query?: QueryParams) {
    const params = query || {}
    const { data } = await httpRequest.get<Response>(this.collectionURL, {
      params,
    })

    return data
  }

  async fetch<Response>(id: string) {
    try {
      const { data } = await httpRequest.get<Response>(
        `${this.collectionURL}/${id}`
      )

      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async save<Request, Response>(payload: Request, id?: string, query?: object) {
    const params = query || {}
    const method = id ? 'put' : 'post'

    try {
      const { data } = await httpRequest[method]<Response>(
        `${this.collectionURL}/${id || ''}`,
        payload,
        { params }
      )

      return data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<Response>(id: string, query?: QueryParams) {
    const params = query || {}

    try {
      const { data } = await httpRequest.delete<Response>(
        `${this.collectionURL}/${id}`,
        {
          params,
        }
      )

      return data
    } catch (error) {
      return this.handleError(error)
    }
  }
}
