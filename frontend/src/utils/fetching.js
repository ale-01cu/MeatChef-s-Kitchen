export default async function fetching(params = {}) {
  const { url, method, headers, body } = params

  try {

    const res = await fetch(url, {
      method,
      headers,
      body
    })
    const data = await res.json()

    console.log('aaaaaaaaaaaaaaa');
    console.log(data);
    
    return {
      response: res,
      data
    }

  }catch(e) {
    console.error(e)
  }
}