import { CollectionView, Field } from './CollectionView.jsx'

export default function Teams() {
  return <CollectionView component="teams" eyebrow="Move together" title="Teams" description="Small groups, shared momentum, and a reason to show up." emptyMessage="No teams have been created yet." renderItem={(team) => <article className="data-card" key={team._id || team.name}><div className="card-mark">{team.name?.slice(0, 1).toUpperCase() || 'T'}</div><h2>{team.name || 'Unnamed team'}</h2><p className="card-description">{team.description || 'Ready for a new challenge.'}</p><Field label="Members">{team.members?.length || 0}</Field></article>} />
}