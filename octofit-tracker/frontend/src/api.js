export const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const hasCodespaceApi = Boolean(codespaceName)
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(component) {
  return `${apiBaseUrl}/api/${component}/`
}

export function collectionFromResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(component, endpoint = apiUrl(component)) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${component}.`)
  return collectionFromResponse(await response.json())
}