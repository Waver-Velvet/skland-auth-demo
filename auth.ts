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

export {
    getTokenByPhonePassword
}