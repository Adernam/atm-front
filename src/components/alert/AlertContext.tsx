import React, { ReactNode, useState } from 'react'

import { AlertType } from './Alert'

type AlertContextType = {
  alerts: AlertType[]
  addAlert: (alert: AlertType) => void
  handleCloseAlert: (id: number) => void
};

export const AlertContext = React.createContext<AlertContextType>({
  alerts: [],
  addAlert: () => null,
  handleCloseAlert: () => null,
})

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertType[]>([])

  const addAlert = (alert: AlertType) => {
    const id = Date.now()
    setAlerts([...alerts, { ...alert, id }])

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((a) => a.id !== id))
    }, 3000)
  }

  const handleCloseAlert = (idAlertToRemove: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter(({ id }) => id !== idAlertToRemove))
  }

  return (
    <AlertContext.Provider value={{ alerts, addAlert, handleCloseAlert }}>
      {children}
    </AlertContext.Provider>
  )
}
