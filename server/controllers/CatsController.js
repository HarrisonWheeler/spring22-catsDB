import { catsService } from '../services/CatsService'
import BaseController from '../utils/BaseController'

// NOTE extends is inheritance - catsController is everything that the basecontroller is, PLUS what we put inside the class

// NOTE Base controller comes from express which builds http requests for us, and allows us to use middleware
export class CatsController extends BaseController {
  constructor() {
    // NOTE super string here is the 'address' the knight will use to access this part of the api
    super('api/cats')
    this.router
      // NOTE further filtering the knight into a more specific section if the api
      .get('', this.getAllCats)
      .get('/:id', this.getCatById)
      .post('', this.createCat)
      .delete('/:id', this.deleteCat)
      .put('/:id', this.editCat)
  }

  // NOTE req is the entire request object being to us
  // res is our response back to the client - more than likely the data they requested.
  async getAllCats(req, res, next) {
    try {
      // More for tomorrow/later this week, but we can directly access any query that is sent to us by the client
      const cats = await catsService.getAllCats(req.query)
      // NOTE make sure to send the data OUT of the api!
      res.send(cats)
    } catch (error) {
      next(error)
    }
  }

  async getCatById(req, res, next) {
    try {
      // NOTE remember that params.id reflects whatever we named the param in the router section of our constructor -
      // ie - if you called it /:id, it will be req.params.id - if it's /:catId, it will be req.params.catId
      const catId = req.params.id
      const foundCat = await catsService.getCatById(catId)
      res.send(foundCat)
    } catch (error) {
      next(error)
    }
  }

  async createCat(req, res, next) {
    try {
      // NOTE req.body is the data being sent by the client to create in our database
      const catToCreate = req.body
      const createdCat = await catsService.createCat(catToCreate)
      res.send(createdCat)
    } catch (error) {
      next(error)
    }
  }

  async deleteCat(req, res, next) {
    try {
      const catToDeleteId = req.params.id
      const delortedCat = await catsService.deleteCat(catToDeleteId)
      res.send(delortedCat)
    } catch (error) {
      next(error)
    }
  }

  async editCat(req, res, next) {
    try {
      // Works better with Auth, but NEVER TRUST CLIENT
      req.body.id = req.params.id
      const editedCat = await catsService.editCat(req.body)
      res.send(editedCat)
    } catch (error) {
      next(error)
    }
  }
}
