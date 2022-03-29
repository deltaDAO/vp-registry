process.env['NODE_CONFIG_DIR'] = __dirname + '/configs'

import 'dotenv/config'
import App from './app'
import validateEnv from './utils/validateEnv'

/* Routes */
import IndexRoute from './routes/index.route'
import VpRoute from './routes/vp.route'
import SignatureRoute from './routes/signature.route'
// v2
import PresentationRoute from './v2/routes/presentation.route'
import CredentialRoute from './v2/routes/credential.route'

const routes = [new IndexRoute(), new VpRoute(), new SignatureRoute(), new PresentationRoute(), new CredentialRoute()]

validateEnv()

const app = new App(routes)

app.listen()
