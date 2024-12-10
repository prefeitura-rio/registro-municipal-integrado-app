export async function getPeople() {
  const mockPerson = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    cpf: '123.456.789-00',
    neighbourhood: 'Downtown',
    bithday: '01/01/1970',
    phone: '+5521999999999',
    address: '123 Main St',
    mostFrequentBus: '777',
    mostFrequentBusStop: '321 Main St',
    referenceHealthUnit: 'Unit 1',
  }

  const items = Array.from({ length: 123 }).map(() => mockPerson)

  return {
    items,
    page: 1,
    size: 10,
    total: 123,
  }
}
