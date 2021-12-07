export const util = {
  methods: {
    toFixed: num => {
      // return isNaN(num) ? '0' : parseFloat(num).toFixed(num <= 0 || num >= 1 ? 2 : 8)
      return isNaN(num) ? '0' : parseFloat(num).toFixed(2)
    },
    toFixedCrypto: num => {
      // return parseFloat(num).toFixed(num > 1 ? 2 : 5)
      return isNaN(num) ? '0' : parseFloat(num).toFixed(8)
    },
    toFixedMarket: num => {
      return num > 1000000000
        ? parseFloat(num / 1000000000).toFixed(2) + 'B'
        : num > 1000000
          ? parseFloat(num / 1000000).toFixed(2) + 'M'
          : parseFloat(num / 1000).toFixed(2) + 'K'
    }
  }
}
