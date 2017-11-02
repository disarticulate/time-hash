/**
 * Based on:
 * - Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 * - timehash.py - Reference Implmentation, A library by Abe Usher to help compute variable precision time intervals,
 * for use in Big Data analysis, spatial-temporal computation, and other quantitative data analysis.
 *
 * Copyright © 2017 LoreFolk, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* REFERENCE SPEC: https://github.com/abeusher/timehash
def before(hashcode):
    """
    Extract the hashcode for the preceding time-window.
    """
    i = 1
    for c in reversed(hashcode):
        padding = (i - 1) * 'f'
        pos = len(hashcode) - i
        if c != '0':
            ret = hashcode[:pos] + __neighbormap[c][0] + padding
            return ret
        else:
            i += 1

def after(hashcode):
    """
    Extract the hashcode for the succeeding time-window.
    """
    i = 1
    for c in reversed(hashcode):
        padding = (i - 1) * '0'
        pos = len(hashcode) - i
        if c != 'f':
            ret = hashcode[:pos] + __neighbormap[c][1] + padding
            return ret
        else:
            i += 1

def neighbors(hashcode):
    """
    Extract the hashcodes for the preceding and succeeding time-windows,
    excluding the hashcode for the current time-window.
    """
    return [before(hashcode), after(hashcode)]

def expand(hashcode):
    """
    Extract the hashcodes for the preceding and succeeding time-windows,
    including the hashcode for the current time-window.
    """
    return [before(hashcode), hashcode, after(hashcode)]

def encode_from_datetime(datetime_object, precision=10):
    """
    Converts a Python datetime object into a timehash value.
    For alternate ways to do datetime conversions, see also: http://stackoverflow.com/questions/6999726/how-can-i-convert-a-datetime-object-to-milliseconds-since-epoch-unix-time-in-p
    """
    milliseconds = time.mktime(datetime_object.timetuple())
    return encode(milliseconds, precision) */

import StaticMap from './static.js'
import { encode, encodems } from './encode.js'
import { decode, decodems, decode_exactly } from './decode.js'

class TimeHash {

  constructor() {
    this.__staticMap = new StaticMap()
    this.encode = encode
    this.encodems = encodems
    this.decode = decode
    this.decodems = decodems
    this.decode_exactly = decode_exactly
  }

  before (hashcode) {
    /*
      Extract the hashcode for the preceding time-window.
    */
    var self = this
    var { __neighbormap } = self.__staticMap
    let hashcode_array = hashcode.split('')
    let hashcode_reverse = hashcode_array.slice(0).reverse() //calling reverse on existing array does it in place

    for (let i = 1; i < hashcode_reverse.length + 1; i++) {
      let c = hashcode_reverse[i - 1]
      if (c !== '0') {
        let padding = Array(i - 1).fill('f').join('')
        let pos = hashcode_array.length - 1
        return `${hashcode_array.slice(0, pos).join('')}${__neighbormap[c][0]}${padding}`
      }
    }
  }

  after (hashcode) {
    /*
      Extract the hashcode for the succeeding time-window.
    */
    var self = this
    var { __neighbormap } = self.__staticMap
    let hashcode_array = hashcode.split('')
    let hashcode_reverse = hashcode_array.slice(0).reverse() //calling reverse on existing array does it in place

    for (let i = 1; i < hashcode_reverse.length + 1; i++) {
      let c = hashcode_reverse[i - 1]
      if (c !== 'f') {
        let padding = Array(i - 1).fill('0').join('')
        let pos = hashcode_array.length - 1
        return `${hashcode_array.slice(0, pos).join('')}${__neighbormap[c][1]}${padding}`
      }
    }
  }

  neighbors (hashcode) {
    /*
      Extract the hashcodes for the preceding and succeeding time-windows,
      excluding the hashcode for the current time-window.
    */
    var self = this
    return [self.before(hashcode), self.after(hashcode)]
  }

  expand (hashcode) {
    /*
      Extract the hashcodes for the preceding and succeeding time-windows,
      including the hashcode for the current time-window.
      Clones strings to avoid
    */
    var self = this
    return [self.before(hashcode), hashcode, self.after(hashcode)]
  }

  encode_from_datetime (datetime_object, precision) {
    /*
      Converts a Javascript datetime object into a timehash value.
      For alternate ways to do datetime conversions,
      see also: http://stackoverflow.com/questions/6999726/how-can-i-convert-a-datetime-object-to-milliseconds-since-epoch-unix-time-in-p
    */
    precision = precision || 10
    let milliseconds = datetime_object.getTime() / 1000
    return encode(milliseconds, precision)
  }
}

export default TimeHash