export const fetchDataCoincap = async () => {
  const res = await fetch('https://api.coincap.io/v2/assets', {
    headers: {
      Accept: 'application/json'
    }
  })
  const json = await res.json()
  return json.data
}

export const fetchAwesomeApi = async () => {
  const res = await fetch('https://economia.awesomeapi.com.br/all/USD-BRL,GBP-BRL,EUR-BRL,ARS-BRL', {
    headers: {
      Accept: 'application/json'
    }
  })
  const json = await res.json()
  return json
}
