async function getTokenByPhonePassword(phone: string, password: string): Promise<{ token: string }> {
    const payload = {
        phone, password
    }
    return fetch(
        `https://as.hypergryph.com/user/auth/v1/token_by_phone_password`,
        {
            method: "POST",
            body: JSON.stringify(payload),
        }
    )
        .then((resp) => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error(`${resp.status}: ${resp.statusText}`)
            }
        })
        .then(json => {
            // const example = {
            //     "status": 0,
            //     "msg": "OK",
            //     "data": {
            //         "token": "<...>"
            //     }
            // }
            if (json.status === 0) {
                return { token: json.data.token }
            } else {
                // Remove sensitive data from error.
                delete json.data
                throw new Error(json)
            }
        })
}

async function sendPhoneCode(phone: string): Promise<void> {
    throw new Error() // TODO
}

async function getTokenByPhoneCode(phone: string, code: string): Promise<{ token: string }> {
    throw new Error() // TODO
}

async function grantOAuthCode(token: string): Promise<{ code: string }> {
    const url = 'https://as.hypergryph.com/user/oauth2/v2/grant'
    const payload = {
        token: token,

        // no idea about following fields
        appCode: '4ca99fa6b56cc2ba',
        type: 0,
    }
    const resp = await fetch(url, { method: 'POST', body: JSON.stringify(payload) })
    if (resp.ok) {
        const json = await resp.json()
        if (json.status === 0) {
            return { code: json.data.code }
        } else {
            delete json.data
            throw new Error(JSON.stringify(json))
        }
    } else {
        const text = await resp.text()
        throw new Error(`${resp.status} ${resp.statusText}: ${text}`)
    }
}

export {
    getTokenByPhonePassword,

    getTokenByPhoneCode,
    sendPhoneCode,

    grantOAuthCode,
}