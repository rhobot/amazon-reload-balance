import {AmazonReloadBalance} from '../'
import localConfig from '../../config/local.json'

const amazonReloadBalance = new AmazonReloadBalance()
amazonReloadBalance.signIn(localConfig.email, localConfig.password)
