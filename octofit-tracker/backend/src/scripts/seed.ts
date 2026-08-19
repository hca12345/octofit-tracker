import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profile: {
    bio: String,
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, required: true },
  completedAt: { type: Date, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, required: true },
  rank: { type: Number, required: true },
  period: { type: String, required: true },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'users');
const Team = mongoose.model('Team', teamSchema, 'teams');
const Activity = mongoose.model('Activity', activitySchema, 'activities');
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard');
const Workout = mongoose.model('Workout', workoutSchema, 'workouts');

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'alex.runner',
        email: 'alex.runner@example.com',
        firstName: 'Alex',
        lastName: 'Rivera',
        profile: { bio: 'Training for a faster 5K.', fitnessLevel: 'intermediate' },
      },
      {
        username: 'jamie.strength',
        email: 'jamie.strength@example.com',
        firstName: 'Jamie',
        lastName: 'Chen',
        profile: { bio: 'Building a consistent strength habit.', fitnessLevel: 'beginner' },
      },
      {
        username: 'taylor.active',
        email: 'taylor.active@example.com',
        firstName: 'Taylor',
        lastName: 'Morgan',
        profile: { bio: 'Keeping the whole team moving.', fitnessLevel: 'advanced' },
      },
    ]);

    await Team.insertMany([
      {
        name: 'OctoFit All-Stars',
        description: 'A friendly team focused on consistency.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Movers',
        description: 'Starting the day with an active routine.',
        members: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id, type: 'running', durationMinutes: 30, points: 60, completedAt: new Date('2026-08-17T07:30:00Z') },
      { userId: users[1]._id, type: 'strength', durationMinutes: 25, points: 50, completedAt: new Date('2026-08-17T16:00:00Z') },
      { userId: users[2]._id, type: 'walking', durationMinutes: 45, points: 45, completedAt: new Date('2026-08-18T06:45:00Z') },
    ]);

    await Leaderboard.insertMany([
      { userId: users[0]._id, points: 320, rank: 1, period: '2026-08' },
      { userId: users[2]._id, points: 285, rank: 2, period: '2026-08' },
      { userId: users[1]._id, points: 240, rank: 3, period: '2026-08' },
    ]);

    await Workout.insertMany([
      { title: 'Steady 5K Builder', type: 'running', difficulty: 'intermediate', durationMinutes: 35, description: 'Alternate easy running and brisk recovery intervals.' },
      { title: 'Foundation Strength', type: 'strength', difficulty: 'beginner', durationMinutes: 20, description: 'Practice bodyweight squats, push-ups, and planks.' },
      { title: 'Active Recovery Walk', type: 'walking', difficulty: 'beginner', durationMinutes: 30, description: 'Take a comfortable walk and focus on steady breathing.' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
