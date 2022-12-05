import axios from 'axios'

export default {
  methods: {
    async $get(url) {
      return (
        await axios.get(url).catch((e) => {
          console.log(e)
        })
      ).data
    },
    async $post(url, data) {
      return await axios.post(url, data).catch((e) => {
        console.log(e)
      })
    },
    async $put(url, data) {
      return await axios.put(url, data).catch((e) => {
        console.log(e)
      })
    },
    async $delete(url) {
      return await axios.delete(url).catch((e) => {
        console.log(e)
      })
    },
    $convertDateFormat(date, format) {
      let year = ''
      let month = ''
      let day = ''

      // date
      // '20220601'
      // Date()
      if (typeof date === 'string' && date.length === 8) {
        year = date.substr(0, 4)
        month = date.substr(4, 2)
        day = date.substr(6, 2)
      } else if (typeof d === 'object') {
        year = date.getFullYear()
        month = (date.getMonth() + 1).toString().padStart(2, 0)
        day = (date.getDate() + 1).toString().padStart(2, 0)
      }

      // format
      // 'YYYY-MM-DD'
      // 'MM-DD-YYYY'
      return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
    },
    $convertNumberFormat(amount, format) {
      let currencySymbol = ''
      let lastSymbol = ''

      if (format.substr(0, 1) !== '#') {
        currencySymbol = format.substr(0, 1)
      }

      if (format.slice(-1) !== '#' && format.slice(-1) !== '0') {
        lastSymbol = format.slice(-1)
        // '#,###.#0%'
        format = format.substring(0, format.length - 1)
      }

      let groupingSeparator = '' // 숫자 3자리마다 구분자 기호
      let decimalSeparator = '' // 소수점 구분자 기호
      let maxFractionDigits = 0 // 소수점 몇자리까지 표기할건지

      if (format.indexOf('.') === -1) {
        // #,###
        groupingSeparator = ','
      } else if (format.indexOf(',') === -1) {
        groupingSeparator = '.'
      } else if (format.indexOf(',') < format.indexOf('.')) {
        // #,###.##
        groupingSeparator = ','
        decimalSeparator = '.'
        maxFractionDigits = format.length - format.indexOf('.') - 1
      } else {
        // #.###,##
        groupingSeparator = '.'
        decimalSeparator = ','
        maxFractionDigits = format.length - format.indexOf(',') - 1
      }

      let sign = '' // amount가 음수일 때
      let dec = 1
      for (let i = 0; i < maxFractionDigits; i++) {
        // i=0, dec = 10
        // i=1, dec = 100
        dec = dec * 10
      }

      // amount = -3500.2345
      // format = #,###.#0
      // -3500.2345 * 100 = -350023.45
      // Math.round() = -350023
      // -350023 / 100 = -3500.23

      // amount = -3500.2375
      // format = #,###.#0
      // -3500.2375 * 100 = -350023.75
      // Math.round() = -350024
      // -350024 / 100 = -3500.24

      let v = String(Math.round(parseFloat(amount) * dec) / dec)

      if (v.startsWith('-')) {
        sign = '-'
        v = v.substring(1)
      }

      // 정수든, 부동소수점이든 상관없이 무조건 소수점이하 자리수 맞춰주는 곳
      if (maxFractionDigits > 0 && format.slice(-1) === '0') {
        v = parseFloat(v).toFixed(maxFractionDigits)
      }

      let d = '' // 소수점이하만
      if (maxFractionDigits > 0 && v.indexOf('.') > -1) {
        d = v.substring(v.indexOf('.')) // .24
        // format = #.###,##
        // #,###.##
        d = d.replace('.', decimalSeparator) // .24 => ,24
        v = v.substring(0, v.indexOf('.')) // 3500
      }

      // 3500 => 3,500
      // 8,281,300 =>

      const regexp = /(\d+)(\d{3})/

      // v = 3524500
      while (regexp.test(v)) {
        // $1 = 3524
        // $2 = 500
        // 3524,500

        // $1 = 3
        // $2 = 524
        // 3,524,500
        v = v.replace(regexp, '$1' + groupingSeparator + '$2')
      }

      return sign + currencySymbol + v + d + lastSymbol
    }
  }
}
