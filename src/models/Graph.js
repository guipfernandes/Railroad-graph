const Node = require('./Node')

module.exports = class Graph {

  constructor(routesToMap) {
    this.nodes = []
    routesToMap.split(",").map(item => item.trim()).forEach(route => {
      this.nodes.push(new Node(route.charAt(0), route.charAt(1), route.charAt(2)))
    });
  }

  getVertices() {
    let vertices = []
    for(let node of this.nodes) {
      if (!vertices.includes(node.from)) vertices.push(node.from)
      if (!vertices.includes(node.to)) vertices.push(node.to)
    }

    return vertices.sort()
  }

  getDistance([...nodes]) {
    let distance = 0
    for(let i = 0; i < nodes.length - 1; i++) {
      let edge = this.nodes.find(node => node.from === nodes[i] && node.to === nodes[i+1])
      if (!edge || !edge.distance || isNaN(edge.distance)) throw new Error("Route doesn't exists")
      distance += edge.distance
    }
    return distance
  }

  evaluateRoutes(trip, currentNode, destination, maxStops, validation, maxDistance) {
    const currentRoute = [...trip, currentNode]
    if(currentNode === destination && currentRoute.length > 1) {
      if (maxStops && validation(trip, maxStops)) {
        return 1
      } else if (maxDistance && validation(currentRoute, maxDistance)) {
        return (1 + this.nodes
          .filter(node => node.from === currentNode)
          .reduce(
            (sum, node) => sum + this.evaluateRoutes(currentRoute, node.to, destination, maxStops, validation, maxDistance), 0
          ))
      } 
    }

    if ((maxStops && trip.length > maxStops) || (maxDistance && this.getDistance(trip) >= maxDistance)) {
      return 0
    } else {
      return this.nodes
        .filter(node => node.from === currentNode)
        .reduce(
          (sum, node) => sum + this.evaluateRoutes(currentRoute, node.to, destination, maxStops, validation, maxDistance), 0
        )
    }
  }

  countRoutesLessThan(origin, destination, stops) {
    return this.evaluateRoutes([], origin, destination, stops, (trip, maxStops) => trip.length <= maxStops)
  }

  countRoutesEqualsTo(origin, destination, stops) {
    return this.evaluateRoutes([], origin, destination, stops, (trip, maxStops) => trip.length === maxStops)
  }

  countRoutesWithDistanceMax(origin, destination, maxDistance) {
    return this.evaluateRoutes([], origin, destination, null, (trip, maxDistance) => this.getDistance(trip) < maxDistance, maxDistance)
  }

  dijkstra(origin, destination) {
    let distances = {}
    let previous = {}
    let queue = []
    let vertices = this.getVertices()

    for(let vertex of vertices) {
      distances[vertex] = Infinity
      previous[vertex] = null
      queue.push(vertex)
    }
    distances[origin] = 0
    
    while(queue.length > 0) {
      let temp = Infinity
      let vertex = null
      for(let i in queue) {
        if (distances[queue[i]] < temp) {
          vertex = queue[i]
          temp = distances[queue[i]]
        }
      }
      if (vertex === destination) break
      queue.splice(queue.indexOf(vertex), 1)
      this.nodes.filter(node => node.from === vertex).map(node => {
        let alt = distances[vertex] + node.distance
        if (alt < distances[node.to]) {
          distances[node.to] = alt
          previous[node.to] = vertex
        }
      })
    }

    return distances[destination]
  }

  getDistanceShortestRoute(origin, destination) {
    let shortestRoute = 0
    if (origin === destination) {
      let routesDistances = this.nodes.filter(node => node.from === origin).map(node => {
        return node.distance + this.dijkstra(node.to, destination)
      })
      shortestRoute = Math.min(...routesDistances)
    } else {
      shortestRoute = this.dijkstra(origin, destination)
    }
    if (!isFinite(shortestRoute)) throw new Error("Route doesn't exists")
    return shortestRoute
  }


}

