/* REFERENCE SPEC: https://github.com/abeusher/timehash
def decode_exactly(timehash):
    """
    Decode the timehash to its exact values, including the error
    margins of the result.  Returns two float values: timehash
    and the plus/minus error for epoch seconds.
    """
    time_interval = (0.0, 4039372800.0)#from January 1, 1970 to January 1, 2098
    time_error = (time_interval[0] + time_interval[1])/2  #this constant is used to calculate the potential time error defined by a particular number of characters
    for c in timehash:
        cd = __decodemap[c]
        for mask in [4, 2, 1]:
            time_error /=2
            mid = (time_interval[0] + time_interval[1])/2
            if cd & mask:
                time_interval = (mid, time_interval[1])
            else:
                time_interval = (time_interval[0], mid)
    time_value = (time_interval[0] + time_interval[1])/2
    return (time_value, time_error)
def decode(timehash):
    """
    Decode timehash, returning a single floating point value for epoch seconds.
    """
    epoch_seconds, time_error = decode_exactly(timehash)
    #drop the time_error for now
    return epoch_seconds
*/

import StaticMap from './static'
import Decimal from 'decimal.js'

const { __base32, __decodemap, time_interval, error_reduction } = new StaticMap()

const decode_exactly = (timehash) => {
  let interval = time_interval.slice(0)
  /*
    Decode the timehash to its exact values, including the error
    margins of the result.  Returns two float values: timehash
    and the plus/minus error for epoch seconds.
  */

  let time_error = error_reduction(interval[0], interval[1])
  let hash_array = timehash.split('')

  hash_array.forEach(
    (c, i) => {
      let cd = __decodemap[c]
      let bits = [4, 2, 1]
      bits.forEach(
        (mask) => {
          time_error = new Decimal(time_error).dividedBy(2)
          let mid = error_reduction(interval[0], interval[1])
          if (cd & mask) {
            interval = [mid, interval[1]]
          } else {
            interval = [interval[0], mid]
          }
        }
      )
    }
  )
  let time_value = error_reduction(interval[0], interval[1])
  return [Number(time_value.toPrecision(20)), Number(time_error.toPrecision(20))]
}

const decode = (timehash) => {
  /*
    Decode timehash, returning a single floating point value for epoch seconds.
  */
  let [epoch_seconds, time_error] = decode_exactly(timehash)
  return epoch_seconds
}

export { decode, decode_exactly }
