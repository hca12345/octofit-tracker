import { CollectionView, Field } from './CollectionView.jsx'

export default function Workouts() {
  return <CollectionView component="workouts" eyebrow="Your next session" title="Workouts" description="Personalized ideas for building a stronger routine." emptyMessage="No workout suggestions are available yet." renderItem={(workout) => <article className="data-card workout-card" key={workout._id || workout.title}><span className="tag">{workout.difficulty || 'all levels'}</span><h2>{workout.title || 'Workout'}</h2><p className="card-description">{workout.description}</p><Field label="Type">{workout.type}</Field><Field label="Duration">{workout.durationMinutes} min</Field></article>} />
}