async function generateCredByCode(code: string): Promise<{ cred: string }> {
    const url = 'https://zonai.skland.com/api/v1/user/auth/generate_cred_by_code'
    const payload = {
        code,

        // Not sure about the following fields.
        kind: 1,
    }
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    const json = await resp.json()
    if (resp.ok && json.status === 0) {
        return { cred: json.data.code }
    } else {
        delete json.data
        throw new Error(`${resp.status} ${resp.statusText}: ${JSON.stringify(json)}`)
    }
}

export {
    generateCredByCode,
}