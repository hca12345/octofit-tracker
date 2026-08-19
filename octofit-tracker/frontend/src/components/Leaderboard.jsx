import { CollectionView, Field } from './CollectionView.jsx'
import { codespaceName, apiUrl } from '../api.js'

const leaderboardEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/` : apiUrl('leaderboard')

export default function Leaderboard() {
  return <CollectionView component="leaderboard" endpoint={leaderboardEndpoint} eyebrow="Friendly competition" title="Leaderboard" description="A live view of the effort moving through the community." emptyMessage="The leaderboard is waiting for its first score." renderItem={(entry) => <article className="data-card rank-card" key={entry._id || entry.userId}><div className="rank-number">{entry.rank || '—'}</div><h2>{entry.userId || 'Athlete'}</h2><Field label="Points">{entry.points}</Field><Field label="Period">{entry.period}</Field></article>} />
}