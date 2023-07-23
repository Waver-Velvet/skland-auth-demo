async function getTokenByPhonePassword (phone: string, password: string): Promise<{ token: string }> {
  const url = 'https://as.hypergryph.com/user/auth/v1/token_by_phone_password'
  const payload = {
    phone,
    password
  }
  const resp = await fetch(url, { method: 'POST', body: JSON.stringify(payload) })
  const json = await resp.json()
  if (resp.ok && json.status === 0) {
    return { token: json.data.token }
  } else {
    delete json.data
    throw new Error(`${resp.status} ${resp.statusText}: ${JSON.stringify(json)}`)
  }
}

async function sendPhoneCode (phone: string): Promise<void> {
  throw new Error() // TODO
}

async function getTokenByPhoneCode (phone: string, code: string): Promise<{ token: string }> {
  throw new Error() // TODO
}

async function grantOAuthCode (token: string): Promise<{ code: string }> {
  const url = 'https://as.hypergryph.com/user/oauth2/v2/grant'
  const payload = {
    token,

    // Not sure about the following fields.
    appCode: '4ca99fa6b56cc2ba',
    type: 0
  }
  const resp = await fetch(url, { method: 'POST', body: JSON.stringify(payload) })
  const json = await resp.json()
  if (resp.ok && json.status === 0) {
    return { code: json.data.code }
  } else {
    delete json.data
    throw new Error(`${resp.status} ${resp.statusText}: ${JSON.stringify(json)}`)
  }
}

export {
  getTokenByPhonePassword,

  getTokenByPhoneCode,
  sendPhoneCode,

  grantOAuthCode
}
