export const translateStatusOperation = (status: string): string => {
  switch (status) {
  case 'CREATED':
    return 'Novo'
  case 'RESERVED':
    return 'Alocado'
  case 'DONE':
    return 'Concluído'
  default:
    throw new Error(`Unknown status ${status}`)
  }
}
