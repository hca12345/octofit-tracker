import { CollectionView, Field } from './CollectionView.jsx'
import { codespaceName, apiUrl } from '../api.js'

const activitiesEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities/` : apiUrl('activities')

export default function Activities() {
  return <CollectionView component="activities" endpoint={activitiesEndpoint} eyebrow="Movement log" title="Activities" description="Every completed session, gathered in one clear pulse." emptyMessage="No activities have been logged yet." renderItem={(activity) => <article className="data-card" key={activity._id || `${activity.userId}-${activity.completedAt}`}><div className="card-mark">{activity.type?.slice(0, 1).toUpperCase() || 'A'}</div><h2>{activity.type || 'Training session'}</h2><Field label="Duration">{activity.durationMinutes} min</Field><Field label="Points">{activity.points}</Field><Field label="Completed">{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : ''}</Field></article>} />
}