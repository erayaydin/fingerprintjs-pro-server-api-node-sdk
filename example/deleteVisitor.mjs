import { FingerprintJsServerApiClient, Region, isDeleteVisitorError } from '@fingerprintjs/fingerprintjs-pro-server-api'
import { config } from 'dotenv'
config()

const apiKey = process.env.API_KEY || 'API key not defined'
const visitorId = process.env.VISITOR_ID || 'Visitor ID not defined'
const envRegion = process.env.REGION

let region = Region.Global
if (envRegion === 'eu') {
  region = Region.EU
} else if (envRegion === 'ap') {
  region = Region.AP
}

if (!visitorId) {
  console.error('Visitor ID not defined')
  process.exit(1)
}

if (!apiKey) {
  console.error('API key not defined')
  process.exit(1)
}

const client = new FingerprintJsServerApiClient({ region, apiKey })

try {
  await client.deleteVisitorData(visitorId)
  console.log(`All data associated with visitor ${visitorId} is scheduled to be deleted.`)
} catch (error) {
  if (isDeleteVisitorError(error)) {
    console.log(error.status, error.error)
  } else {
    console.error('unknown error: ', error)
  }
  process.exit(1)
}
