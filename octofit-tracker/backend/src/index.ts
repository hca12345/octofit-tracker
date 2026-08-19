import express from 'express'
import apiRouter from './routes/api.js'
import { connectDatabase } from './config/database.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: 'mongodb', baseUrl })
})

app.listen(port, () => {
  console.log(`OctoFit API listening on ${baseUrl}`)
})
void connectDatabase()