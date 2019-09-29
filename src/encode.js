/* REFERENCE SPEC: https://github.com/abeusher/timehash
def encode(timeseconds, precision=10):
    """
    Encode a timestamp given as a floating point epoch time to
    a timehash which will have the character count precision.
    Fixed a nasty logic error in the timehash encode function, credit to LC3.
    """
    time_interval = (0.0, 4039372800.0)#from January 1, 1970 to January 1, 2098
    timehash = []
    bits = [4, 2, 1]
    bit = 0
    ch = 0
    while len(timehash) < precision:
        mid = (time_interval[0] + time_interval[1])/2
        if timeseconds > mid:
            ch |= bits[bit]
            time_interval = (mid, time_interval[1])
        else:
            time_interval = (time_interval[0], mid)
        if bit < 2:
            bit += 1
        else:
            timehash += __base32[ch]
            bit = 0
            ch = 0
    return ''.join(timehash)
*/

import StaticMap from './static'
import Decimal from 'decimal.js'

const { __base32, time_interval, error_reduction } = new StaticMap()

const encode = (timeseconds, precision) => {
  /*
    Encode a timestamp given as a floating point epoch time to
    a timehash which will have the character count precision.
    Fixed a nasty logic error in the timehash encode function, credit to LC3.
  */
  if (timeseconds instanceof Date) {
    timeseconds = milliseconds.valueOf() / 1000
  }
  precision = precision || 10 // default
  let interval = time_interval.slice(0)
  let timehash = []
  let bits = [4, 2, 1]
  let bit = 0
  let ch = 0
  while (timehash.length < precision) {
    let mid = error_reduction(interval[0], interval[1])

    if (mid.lessThan(timeseconds)) {
      ch = ch | bits[bit]
      interval = [mid, interval[1]]
    } else {
      interval = [interval[0], mid]
    }

    if (bit < 2) {
      bit = bit + 1
    } else {
      timehash.push(__base32[ch])
      bit = 0
      ch = 0
    }
  }
  return timehash.join('')
}

const encodems = (milliseconds, precision) => {
  if (milliseconds instanceof Date) {
    milliseconds = milliseconds.valueOf()
  }
  let timeseconds = milliseconds / 1000
  return encode(timeseconds, precision)
}

export { encode, encodems }
