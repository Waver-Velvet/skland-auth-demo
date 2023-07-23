import { getTokenByPhonePassword, grantOAuthCode } from './src/hypergryph-auth'
import { generateCredByCode } from './src/skland-auth'

async function login (phone: string, password: string): Promise<string> {
  const { token } = await getTokenByPhonePassword(phone, password)
  const { code } = await grantOAuthCode(token)
  const { cred } = await generateCredByCode(code)
  return cred
}

// Phone and Password of HyperGryph Account
const phone = '<PHONE NUMBER>'
const password = '<PASSWORD>'

login(phone, password)
  .then(cred => { console.log(cred) })
