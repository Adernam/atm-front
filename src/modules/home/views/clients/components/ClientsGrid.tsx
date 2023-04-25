import React from 'react'

import { GridColDef } from '@mui/x-data-grid'
import { DefaultGrid } from 'components/DefaultGrid'
import { ClientsStore } from 'modules/home/store/Clients'

type Props = {
  store: ClientsStore
};

export function ClientsGrid({ store }: Props) {
  const gridCols: GridColDef[] = [
    {
      field: 'name',
      flex: 1,
      type: 'string',
      headerName: 'Nome',
    },
    {
      field: 'cpf',
      type: 'string',
      headerName: 'CPF',
      width: 120,
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'active',
      type: 'boolean',
      headerName: 'Ativo',
      width: 120,
    },
  ]

  return (
    <DefaultGrid
      store={store}
      cols={gridCols}
      actions={['delete', 'edit']}
    />
  )
}
