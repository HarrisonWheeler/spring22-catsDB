import { generateId } from '../../client/app/Utils/generateId'
import { FakeDB } from '../db/FakeDB'
import { BadRequest } from '../utils/Errors'

class CatsService {
  async editCat(newCat) {
    const originalCat = await this.getCatById(newCat.id)
    // NOTE making sure that the field exists on the new cat if it doesnt, keep the original content
    originalCat.name = newCat.name || originalCat.name
    originalCat.age = newCat.age || originalCat.age
    return originalCat
  }

  async deleteCat(catToDeleteId) {
    // This line will be more applicable once we get into mongoose/mongoDB
    const catToDelete = await this.getCatById(catToDeleteId)
    FakeDB.cats = FakeDB.cats.filter(c => c.id !== catToDeleteId)
    return catToDelete
  }

  async createCat(catToCreate) {
    // ONLY FOR TODAY!!!
    catToCreate.id = generateId()
    FakeDB.cats.push(catToCreate)
    return FakeDB.cats
  }

  async getCatById(catId) {
    const foundCat = FakeDB.cats.find(c => c.id === catId)
    // NOTE we should always check to see if we found that thing - if we don't, throw the proper error
    if (!foundCat) {
      throw new BadRequest('Unable to find that kitty')
    }
    return foundCat
  }

  async getAllCats(query = {}) {
    // NOTE setting you up for query objects for tomorrow
    // const foundCats = FakeDB.cats.find(c => c.name === query.name)
    // return foundCats
    return FakeDB.cats
  }
}

export const catsService = new CatsService()
