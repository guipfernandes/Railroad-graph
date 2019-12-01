const assert = require('assert')
const Graph = require('../src/models/Graph')

const railroad = new Graph("BC4, AD5, DC8, CD8, DE6, CE2, AE7, EB3, AB5")

describe('Get distance', () => {
  it('#1: Distance of A-B-C route is 9', () => {
    assert.equal(9, railroad.getDistance(['A', 'B', 'C']))
  })

  it('#2: Distance of A-D route is 5', () => {
    assert.equal(5, railroad.getDistance(['A', 'D']))
  })

  it('#3: Distance of A-D-C route is 13', () => {
    assert.equal(13, railroad.getDistance(['A', 'D', 'C']))
  })

  it('#4: Distance of A-E-B-C-D route is 22', () => {
    assert.equal(22, railroad.getDistance(['A', 'E', 'B', 'C', 'D']))
  })

  it("#5: A-E-D route doesn't exists", () => {
    assert.throws(() => railroad.getDistance(['A', 'E', 'D']))
  })
})

describe('Count routes', () => {
  it("#6: Count routes C --> C with max 3 stops is 2", () => {
    assert.equal(2, railroad.countRoutesWithMaxStops('C', 'C', 3))
  })

  it("#7: Count routes A --> C with exactly 4 stops is 3", () => {
    assert.equal(3, railroad.countRoutesStopsEqualsTo('A', 'C', 4))
  })
  
  it("#10: Count routes C --> C with max distance 30 is 7", () => {
    assert.equal(7, railroad.countRoutesWithMaxDistance('C', 'C', 30))
  })
})
  
describe('Shortest distance', () => {
  it("#8: Shortest distance of A --> C is 9", () => {
    assert.equal(9, railroad.getShortestDistanceRoute('A', 'C'))
  })

  it("#9: Shortest distance of B --> B is 9", () => {
    assert.equal(9, railroad.getShortestDistanceRoute('B', 'B'))
  })
})

describe('Extra test', () => {
  it("#EXTRA: Count routes A --> E with max 3 stops and max distance 11 is 3", () => {
    assert.equal(3, railroad.countRoutesWithMaxStopsAndDistance('A', 'E', 3, 11))
  })

})