import React, {
  useEffect,
  useState,
  useContext,
  useTransition,
  useMemo,
} from 'react'
import { useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { AlertContext } from 'components/alert/AlertContext'
import { BaseStore } from 'utils/services/BaseStore'

export type GridRow = {
  id: string
  field: string
  type: string
  flex: number
  actions: string[]
}

type Actions = 'edit' | 'delete'

type PropsGrid = {
  store: BaseStore
  cols: GridColDef[]
  actions?: Actions[]
  query?: object
}

export function DefaultGrid<T>({ store, cols, actions, query }: PropsGrid) {
  const entityName = store.entityName
  const [columns, setColumns] = useState<GridColDef[]>([...cols])
  const [data, setData] = useState<Array<T>>([])
  const [rowToDelete, setRowToDelete] = useState<string>('')
  const { addAlert } = useContext(AlertContext)
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  const loadData = () => {
    startTransition(() => {
      store
        .fetchAll(query)
        .then((data) => setData(data as Array<T>))
        .catch((error) => {
          if (error.response?.status !== 401) {
            addAlert({
              message: 'Falha ao carregar dados',
              title: 'Erro',
              type: 'error',
            })
          }

          console.error(error)
        })
    })
  }

  const handleDeleteItem = () => {
    store.delete(rowToDelete).then(() => {
      addAlert({
        type: 'success',
        message: 'Registro deletado com sucesso!',
        title: 'Sucesso!',
      })
      setRowToDelete('')
      loadData()
    })
  }

  const handleOnClickDeleteAction = (rowID: string) => {
    setRowToDelete(rowID)
  }

  const handleEditItem = (rowID: string) => {
    navigate(`${entityName}/${rowID}`)
  }

  const handleCloseDialog = () => {
    setRowToDelete('')
  }

  const RenderEditAction = (row: GridRow) =>
    useMemo(
      () => (
        <GridActionsCellItem
          key='editAction'
          icon={<ModeEditIcon />}
          label='Editar'
          onClick={() => handleEditItem(row.id)}
        />
      ),
      [row.id]
    )

  const RenderDeleteAction = (row: GridRow) =>
    useMemo(
      () => (
        <GridActionsCellItem
          key='deleteAction'
          icon={<DeleteIcon />}
          label='Deletar'
          onClick={() => handleOnClickDeleteAction(row.id)}
        />
      ),
      [row.id]
    )

  const aliasActions = {
    edit: RenderEditAction,
    delete: RenderDeleteAction,
  }

  const renderActions = () => {
    if (actions) {
      const newCols = [...cols]
      newCols.push({
        headerName: 'Ações',
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) =>
          actions.map((action) => aliasActions[action](params.row)),
      })
      setColumns(newCols)
    }
  }

  useEffect(() => {
    if (actions) renderActions()
  }, [actions])

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[100]}
        sx={{
          minHeight: 400,
          width: '100%',
          '.MuiDataGrid-columnHeaderTitle': {
            fontSize: '0.8rem',
            fontWeight: '600',
          },
          '.MuiDataGrid-cellContent': {
            fontSize: '0.8rem',
          },
        }}
        disableRowSelectionOnClick
        disableColumnSelector
        loading={isPending}
      />
      <Dialog
        id='dialogGrid'
        open={!!rowToDelete}
        onClose={handleCloseDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '.MuiDialog-paper': {
            padding: 1,
          },
        }}
      >
        <DialogTitle id='alert-dialog-title'>Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Esta operação é irreversível, deseja realmente deletar este
            registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleDeleteItem}
            autoFocus
            variant='contained'
            color='primary'
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
