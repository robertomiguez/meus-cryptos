export const fetchDataCoincap = async () => {
  const res = await fetch('https://api.coincap.io/v2/assets', {
    headers: {
      Accept: 'application/json'
    }
  })
  const json = await res.json()
  return json.data
}

export const fetchDataForex = async () => {
  const res = await fetch('https://api.openrates.io/latest?base=USD&symbols=USD,GBP,EUR,BRL', {
    headers: {
      Accept: 'application/json'
    }
  })
  const json = await res.json()
  return json
}
