import { Router } from 'express'
import type { Model } from 'mongoose'
import type { NextFunction, Request, Response } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const router = Router()

const list = (model: Model<unknown>) => async (_request: Request, response: Response, next: NextFunction) => {
  try {
    response.json(await model.find().lean())
  } catch (error) {
    next(error)
  }
}

router.get('/users', list(User))
router.get('/teams', list(Team))
router.get('/activities', list(Activity))
router.get('/leaderboard', list(Leaderboard))
router.get('/workouts', list(Workout))

router.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body))
  } catch (error) {
    next(error)
  }
})

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body))
  } catch (error) {
    next(error)
  }
})

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body))
  } catch (error) {
    next(error)
  }
})

export default router