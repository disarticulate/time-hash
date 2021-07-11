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
import TimeHash from '../src'
import StaticMap from '../src/static'

const { __base32, time_interval } = new StaticMap()

describe('timehash [package]', () => {
  let timehash = new TimeHash()
  let [begin, cease] = time_interval

  describe('before', () => {
    let cease_input = 'ffffffffff'
    let cease_input_before = timehash.before(cease_input)
    it('should return a String', () => {
      expect(cease_input_before).to.be.a('string')
    })
    it('should return a cannonical output', () => {
      expect(cease_input_before).to.be.equal('fffffffffe')
    })
    it('should count down canonical output', () => {
      expect(timehash
        .before(cease_input_before)).to.be.equal('fffffffffd')
    })
  })
  describe('after', () => {
    let begin_input = '0000000000'
    let begin_input_after = timehash.after(begin_input)  
    it('should return a String', () => {
      expect(begin_input_after).to.be.a('string')
    })
    it('should return a cannonical output', () => {
      expect(begin_input_after).to.be.equal('0000000001')
    })
    it('should count down canonical output', () => {
      expect(timehash
        .after(begin_input_after)).to.be.equal('000000000a')
    })
  })

  describe('neighbors', () => {
    let input = '000000000a'
    let neighbors = timehash.neighbors(input)
    it('should return a Array', () => {
      expect(neighbors).to.be.an.instanceof(Array)
    })
    
    let [neighbor_before, neighbor_after] = neighbors

    it('should return a canonical output', () => {
      expect(neighbor_before).to.be.equal('0000000001')
    })
    it('should count down canonical output', () => {
      expect(neighbor_after).to.be.equal('000000000b')
    })

    let [pivot_before, pivot_after] = timehash.neighbors('c00001b1dd')
    it('should find neighbor pivot_before', () => {  
      expect(pivot_before).to.be.equal('c00001b1dc')
    })
    it('should find neighbor pivot_after', () => {
      expect(pivot_after).to.be.equal('c00001b1de')
    })
  })

  describe('expand', () => {
    let input = '000000000a'
    let expand = timehash.expand(input)
    it('should return a Array', () => {
      expect(expand).to.be.an.instanceof(Array)
    })
    it('should return a Array of proper length', () => {
      expect(expand.length).to.be.equal(3)
    })
    let [neighbor_before, input_clone, neighbor_after] = expand

    it('should return a canonical neighbor_before', () => {
      expect(neighbor_before).to.be.equal('0000000001')
    })
    it('should return a canonical input_clone', () => {
      expect(input_clone).to.be.equal(input)
    })
    it('should count down canonical neighbor_after', () => {
      expect(neighbor_after).to.be.equal('000000000b')
    })
  })

  describe('encode_from_datetime', () => {
    let begin_input = new Date('1970-01-01 00:00:00 GMT') // must use UTC/GMT
    let pivot_input = new Date('2034-01-01 00:00:00 GMT') // must use UTC/GMT
    let cease_input = new Date('2098-01-01 00:00:00 GMT') // must use UTC/GMT

    let begin_hash = timehash.encode_from_datetime(begin_input)
    let pivot_hash = timehash.encode_from_datetime(pivot_input)
    let cease_hash = timehash.encode_from_datetime(cease_input)

    it('should return a String', () => {
      expect(begin_hash).to.be.a('string')
      expect(pivot_hash).to.be.a('string')
      expect(cease_hash).to.be.a('string')
    })

    it('should return a canonical begin_hash', () => {
      expect(begin_hash).to.be.equal('0000000000')
    })

    it('should return a canonical pivot_hash', () => {
      expect(pivot_hash).to.be.equal('bfffffffff')
    })

    it('should return a canonical cease_hash', () => {
      expect(cease_hash).to.be.equal('ffffffffff')
    })

  })
})
