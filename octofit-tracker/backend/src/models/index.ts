import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profile: {
    bio: String,
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  },
})

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  completedAt: { type: Date, required: true },
})

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
  period: { type: String, required: true },
})

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
})

export const User = mongoose.models.User ?? mongoose.model('User', userSchema, 'users')
export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema, 'teams')
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema, 'activities')
export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard')
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema, 'workouts')