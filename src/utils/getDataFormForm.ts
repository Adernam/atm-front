export const getDataFromForm = (form: HTMLFormElement): object => {
  const targetForm = new FormData(form)
  const data = Object.fromEntries(targetForm.entries())
  return data
}
