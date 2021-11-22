process.env['NODE_CONFIG_DIR'] = __dirname + '/configs'

import 'dotenv/config'
import App from './app'
import validateEnv from './utils/validateEnv'

/* Routes */
import IndexRoute from './routes/index.route'
import VpRoute from './routes/vp.route'
import SignatureRoute from './routes/signature.route'

const routes = [new IndexRoute(), new VpRoute(), new SignatureRoute()]

validateEnv()

const app = new App(routes)

app.listen()
