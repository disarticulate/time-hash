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

describe('staticMap', () => {
  describe('new StaticMap', () => {
    const staticMap = new StaticMap()
    it('should have the property __base32', () => {
      expect(staticMap).to.have.property('__base32')
      expect(staticMap.__base32).to.be.equal('01abcdef')
    })
    it('should have the property __before', () => {
      expect(staticMap).to.have.property('__before')
      expect(staticMap.__before).to.be.equal('f01abcde')
    })
    it('should have the property __after', () => {
      expect(staticMap).to.have.property('__after')
      expect(staticMap.__after).to.be.equal('1abcdef0')
    })
    it('should have the property __decodemap', () => {
      expect(staticMap).to.have.property('__decodemap')
      expect(staticMap.__decodemap).to.have.properties({ '0': '0' })
      expect(staticMap.__decodemap).to.have.properties({ 'f': '7' })
      expect(Object.keys(staticMap.__decodemap).length).to.be.equal(8)
    })
    it('should have the property __neighbormap', () => {
      expect(staticMap).to.have.property('__neighbormap')
      expect(staticMap.__neighbormap).to.have.properties({ '0': ['f', '1'] })
      expect(staticMap.__neighbormap).to.have.properties({ 'f': ['e', '0'] })
      expect(Object.keys(staticMap.__neighbormap).length).to.be.equal(8)
    })
    it('should have the property time_interval', () => {
      expect(staticMap).to.have.property('time_interval')
      expect(staticMap.time_interval).to.be.an.instanceof(Array);
      expect(staticMap.time_interval.length).to.be.equal(2)
    })
  })
})

