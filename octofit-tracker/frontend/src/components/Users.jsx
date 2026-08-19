import { CollectionView, Field } from './CollectionView.jsx'

export default function Users() {
  return <CollectionView component="users" eyebrow="Your community" title="Users" description="Meet the people making progress, one session at a time." emptyMessage="No user profiles are available yet." renderItem={(user) => <article className="data-card" key={user._id || user.username}><div className="card-mark">{user.firstName?.slice(0, 1) || user.username?.slice(0, 1) || 'U'}</div><h2>{[user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'Athlete'}</h2><p className="card-description">{user.profile?.bio || user.email || 'Profile in progress.'}</p><Field label="Level">{user.profile?.fitnessLevel}</Field></article>} />
}