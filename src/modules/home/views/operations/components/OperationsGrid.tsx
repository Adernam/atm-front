import React from 'react'

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { DefaultGrid } from 'components/DefaultGrid'
import { OperationModel } from 'domain/model/operation'
import moment from 'moment'
import { BaseStore } from 'utils/services/BaseStore'
import { translateStatusOperation } from 'utils/stringConverter'

type Props = {
  store: BaseStore
}

export function OperationsGrid({ store }: Props) {
  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const cols: GridColDef[] = [
    {
      field: 'client.name',
      flex: 1,
      type: 'string',
      headerName: 'Cliente',
      valueGetter(params: GridValueGetterParams<OperationModel>) {
        return params.row.client?.name
      },
    },
    {
      field: 'status',
      flex: 1,
      type: 'string',
      headerName: 'Status',
      valueFormatter: ({ value }) => translateStatusOperation(value),
    },
    {
      field: 'createdAt',
      flex: 1,
      type: 'datetime',
      headerName: 'Criado em',
      valueFormatter: ({ value }) => moment(value).format('DD/MM/YYYY'),
    },
    {
      field: 'packages',
      flex: 1,
      type: 'number',
      headerName: 'Valor total',
      valueGetter(params: GridValueGetterParams<OperationModel>) {
        return params.row.packages.reduce(
          (prev, curr) => prev + curr.quantityNote * curr.typeNote,
          0
        )
      },
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    },
  ]

  return (
    <DefaultGrid
      store={store}
      cols={cols}
      actions={['delete', 'edit']}
    />
  )
}
