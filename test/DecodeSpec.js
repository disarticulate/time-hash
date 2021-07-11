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
import { decode, decode_exactly } from '../src/decode'

chai.use(chaiProperties)

const { __base32, time_interval } = new StaticMap()

describe('decode [package]', () => {
  let [begin, cease] = time_interval
  let begin_input = '0000000000'
  let cease_input = 'ffffffffff'
  describe('decode', () => {
    let begin_output = decode(begin_input)
    let cease_output = decode(cease_input)
    it('should return a Number', () => {
      expect(begin_output).to.be.a('number')
      expect(cease_output).to.be.a('number')
    })
    it('should return a approximate lower bounds', () => {
      expect(begin_output).to.be.equal(1.8809795379638672)
    })
    it('should return a approximate upper bounds', () => {
      expect(cease_output).to.be.equal(4039372798.1190205)
    })
    it('should return a approximate pivot bounds', () => {
      expect(decode('c00001b1dd')).to.be.equal(2019707999.2880344)
    })
  })
  describe('decode_exactly', () => {
    let begin_output = decode_exactly(begin_input)
    let cease_output = decode_exactly(cease_input)
    it('should return a Array', () => {
      expect(begin_output).to.be.an.instanceof(Array)
      expect(cease_output).to.be.an.instanceof(Array)
    })
    it('should return array with numbers', () => {
      begin_output.map(output => expect(output).to.be.a('number'))
      cease_output.map(output => expect(output).to.be.a('number'))
    })
    let [begin_value, begin_error] = begin_output
    let [cease_value, cease_error] = cease_output
    it('should return errors equal to', () => {
      expect(begin_error).to.be.equal(1.8809795379638672)
      expect(cease_error).to.be.equal(1.8809795379638672)
    })
  })
})

