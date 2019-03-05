import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import verifySecret from 'verify-github-webhook-secret'
import './utils/logger'
import { GITHUB_HOOK_SECRET } from './utils/secrets'

const app: express.Application = express()

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/payload', async function(req, res) {
  const valid = await verifySecret(
    JSON.stringify(req.body),
    GITHUB_HOOK_SECRET,
    req.get('x-hub-signature')
  )

  if (!valid) {
    res.sendStatus(401)
    return
  }

  const eventName = req.get('x-github-event')
  const event = req.body

  console.log(eventName, event)

  res.sendStatus(200)
})

export default app
