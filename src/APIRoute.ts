import { Hono } from 'hono'
import users from './users'
import project from './projects'

const apiroute = new Hono<{ Bindings: CloudflareBindings }>()

apiroute.get('/', ({env, text}) => {
  return text('Hello Hono! api route')
})

apiroute.route('/users', users )
apiroute.route('/project', project )

export default apiroute;