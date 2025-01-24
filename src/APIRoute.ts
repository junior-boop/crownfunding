import { Hono } from 'hono'
import users from './users'

const apiroute = new Hono<{ Bindings: CloudflareBindings }>()

apiroute.get('/', ({env, text}) => {
  return text('Hello Hono! api route')
})

apiroute.route('/users', users )

export default apiroute;