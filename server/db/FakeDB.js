import { generateId } from '../../client/app/Utils/generateId'
// NOTE this is only here for today!!!!!

export const FakeDB = {
  cats: [
    {
      name: 'Moo',
      age: 8,
      id: generateId()
    },
    {
      name: 'Jax',
      age: 13,
      id: generateId()
    },
    {
      name: 'Koda',
      age: 5,
      id: generateId()
    }
  ]
}
