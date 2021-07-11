/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2017 LoreFolk, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import chai from 'chai'
import chaiProperties from 'chai-properties'
import { expect } from 'chai'

import StaticMap from '../src/static'
import { encode } from '../src/encode'
import { decode, decode_exactly } from '../src/decode'

const { __base32, time_interval } = new StaticMap()

describe('encode', () => {
  let [begin, cease] = time_interval
  let begin_output = '0000000000'
  let cease_output = 'ffffffffff'
  it('should return String', () => {
    expect(encode(begin)).to.be.a('string')
  })
  it('should default string length', () => {
    expect(encode(begin).length).to.be.equal(10)
    expect(encode(cease).length).to.be.equal(10)
    expect(encode(begin)).to.be.equal(begin_output)
  })
  it('should accept precision override', () => {
    let precision = 8
    expect(encode(begin,precision).length).to.be.equal(precision)
    expect(encode(cease,precision).length).to.be.equal(precision)
    expect(encode(begin,precision)).to.be.equal(begin_output.substring(0,precision))
  })
  it('should allow variable length precisions 1-10', () => {
    for (let i =1; i <= 10; i++) {
      let encode_begin = encode(begin,i)
      let encode_cease = encode(cease,i)
      expect(encode_begin.length).to.be.equal(i)
      expect(encode_cease.length).to.be.equal(i)
      expect(encode_begin,`precision ${i}`).to.be.equal(begin_output.substring(0,i))
      expect(encode_cease,`precision ${i}`).to.be.equal(cease_output.substring(0,i))
    }    
  })

  it('should calculate canonical pivot_point 2019707999.2880344', () => {
    let encode_pivot = encode(2019707999.2880344)
    expect(encode_pivot).to.be.equal('c00001b1dd')
  })
})
