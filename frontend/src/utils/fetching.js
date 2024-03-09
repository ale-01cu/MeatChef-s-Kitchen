export default async function fetching(params = {}) {
  const { url, method, headers, body } = params
    const res = await fetch(url, {
      method,
      headers,
      body
    })
    const data = await res.json()
    if(!res.ok) throw new Error(data.detail)

    return {
      response: res,
      data
    }
}