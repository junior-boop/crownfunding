import { Hono } from 'hono'
import apiroute from './APIRoute'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.route('/api', apiroute )

app.get('/', ({env, text}) => {
  
  return text('Hello Hono!')
})



export default app