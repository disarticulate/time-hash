/*
This module creates a fuzzy precision representation of a time interval.
It makes calculations based on a 64 year representation of time from January 1, 1970 to January 1, 2098.
Values are encoded with a number of bits(represented by an ASCII character) that indicate the amount of time to add to 1970.
Times prior to 1970 or after 2098 are not accounted for by this scale.
Each character added to the timehash reduces the time interval ambiguity by a factor of 8.
Valid characters for encoding the floating point time into ASCII characters include {01abcdef}
0 +/- 64 years
1 +/- 8 years
2 +/- 1 years
3 +/- 45.65625 days
4 +/- 5.707 days
5 +/- 0.71337 days = 17.121 hours
6 +/- 2.14013671875 hours
7 +/- 0.26751708984375 hours = 16.05 minutes
8 +/- 2.006378173828125 minutes
9 +/- 0.2507 minutes = 15 seconds
10 +/- 1.88097 seconds */

/* Reference Implmentation, static maps

__base32 = '01abcdef'
__before = 'f01abcde'
__after = '1abcdef0'
__decodemap = { }
__neighbormap = { }

for i in range(len(__base32)):
    __decodemap[__base32[i]] = i
    __neighbormap[__base32[i]] = (__before[i], __after[i])
del i
*/

import Decimal from 'decimal.js'

Decimal.set({ precision: 18, rounding: 4 })

class StaticMap {

  constructor() {
    this.__base32 = '01abcdef'
    this.__before = 'f01abcde'
    this.__after = '1abcdef0'
    this.time_interval = [0.0, 4039372800.0] //from January 1, 1970 to January 1, 2098

    this.__decodemap = {}
    this.__neighbormap = {}
    this.__generateMap ()
  }
  error_reduction (begin, cease) {
    return new Decimal(begin)
      .add(new Decimal(cease))
      .dividedBy(2)
  }
  __generateMap () {
    var self = this
    let base32 = self.__base32.split('')
    let before = self.__before.split('')
    let after = self.__after.split('')
    self.__base32.split('').forEach(
      (item, i) => {
        let sindex = i.toString() //expect decoding to use all strings
        self.__decodemap[base32[i]] = sindex
        self.__neighbormap[base32[i]] = [before[i], after[i]]
      }
    )
  }
}

export default StaticMap
