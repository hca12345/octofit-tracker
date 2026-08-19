import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function CollectionView({ component, title, eyebrow, description, renderItem, emptyMessage }) {
  const [items, setItems] = useState([])
  const [state, setState] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchCollection(component)
      .then((nextItems) => {
        if (active) {
          setItems(nextItems)
          setState('ready')
        }
      })
      .catch((requestError) => {
        if (active) {
          setError(requestError.message)
          setState('error')
        }
      })
    return () => { active = false }
  }, [component])

  return <section className="view-shell">
    <div className="view-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div><span className="result-count">{state === 'ready' ? `${items.length} records` : 'Syncing'}</span></div>
    {state === 'loading' && <div className="status-panel">Loading {component}...</div>}
    {state === 'error' && <div className="status-panel status-error">{error} Check that the API is running.</div>}
    {state === 'ready' && items.length === 0 && <div className="status-panel">{emptyMessage}</div>}
    {state === 'ready' && items.length > 0 && <div className="collection-grid">{items.map(renderItem)}</div>}
  </section>
}

export function Field({ label, children }) {
  return <div className="field"><span>{label}</span><strong>{children || '—'}</strong></div>
}