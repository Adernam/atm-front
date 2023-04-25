import React, { useState } from 'react'

export function useForm<T>(initialState: T) {
  const [formState, setFormState] = useState<T>(initialState)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target

    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSwitchChange = (event: any) => {
    const { name, checked } = event.target

    setFormState((prevState: any) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const resetForm = () => {
    setFormState(initialState)
  }

  return {
    formState,
    handleInputChange,
    handleSwitchChange,
    resetForm,
    setFormState,
  }
}
