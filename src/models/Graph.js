const Node = require('./Node')

module.exports = class Graph {

  constructor(routesToMap) {
    this.nodes = [];

    // Mapeia os nós junto com suas distâncias
    routesToMap.split(",").map(item => item.trim()).forEach(route => {
      this.nodes.push(new Node(route.charAt(0), route.charAt(1), route.charAt(2)));
    });
  }

  // Retorna os vértices do grafo passado em ordem
  getVertices() {
    let vertices = [];
    for(let node of this.nodes) {
      if (!vertices.includes(node.from)) vertices.push(node.from);
      if (!vertices.includes(node.to)) vertices.push(node.to);
    }
    return vertices.sort();
  }

  // Retorna a distância da rota passada
  getDistance([...nodes]) {
    let distance = 0;
    for(let i = 0; i < nodes.length - 1; i++) {
      let edge = this.nodes.find(node => node.from === nodes[i] && node.to === nodes[i+1]);
      if (!edge || !edge.distance || isNaN(edge.distance)) throw new Error("Route doesn't exists");
      distance += edge.distance;
    }
    return distance;
  }

  // Retorna o número de rotas a partir dos parâmetros passados
  evaluateRoutes(trip, currentNode, destination, maxStops, maxDistance, validation) {
    const currentRoute = [...trip, currentNode];
    if(currentNode === destination && currentRoute.length > 1) {
      if (maxStops && validation(trip, maxStops)) {
        return 1;
      } else if (maxDistance && validation(currentRoute, maxDistance)) {
        // Continua a buscar mesmo depois de chegar ao nó destino para alcançar novas rotas passando pelo destino
        return (1 + this.nodes
          .filter(node => node.from === currentNode)
          .reduce((sum, node) => 
            sum + this.evaluateRoutes(currentRoute, node.to, destination, maxStops, maxDistance, validation), 0
          ));
      }
    }

    if ((maxStops && trip.length > maxStops) || (maxDistance && this.getDistance(trip) >= maxDistance)) {
      return 0;
    } else {
      return this.nodes
        .filter(node => node.from === currentNode)
        .reduce((sum, node) => 
          sum + this.evaluateRoutes(currentRoute, node.to, destination, maxStops, maxDistance, validation), 0
        );
    }
  }

  // Conta rotas que possuem no máximo o número de paradas passada
  countRoutesWithMaxStops(origin, destination, stops) {
    return this.evaluateRoutes([], origin, destination, stops, null, (trip, maxStops) => trip.length <= maxStops);
  }

  // Conta rotas que possuem exatamente o número de paradas passada
  countRoutesStopsEqualsTo(origin, destination, stops) {
    return this.evaluateRoutes([], origin, destination, stops, null, (trip, maxStops) => trip.length === maxStops);
  }

  // Conta rotas que possuem a distância máxima passada
  countRoutesWithMaxDistance(origin, destination, maxDistance) {
    return this.evaluateRoutes([], origin, destination, null, maxDistance, 
      (trip, maxDistance) => this.getDistance(trip) < maxDistance);
  }

  // Algoritmo de dijkstra para retornar menor percuso em um grafo
  dijkstra(origin, destination) {
    let distances = {};
    let vertices = this.getVertices();

    for(let vertex of vertices) {
      distances[vertex] = Infinity;
    }
    distances[origin] = 0;
    
    while(vertices.length > 0) {
      let temp = Infinity;
      let vertex = null;
      for(let i in vertices) {
        if (distances[vertices[i]] < temp) {
          vertex = vertices[i];
          temp = distances[vertices[i]];
        }
      }
      if (vertex === destination) break;
      vertices.splice(vertices.indexOf(vertex), 1);
      this.nodes.filter(node => node.from === vertex).map(node => {
        let alt = distances[vertex] + node.distance;
        if (alt < distances[node.to]) {
          distances[node.to] = alt;
        }
      });
    }

    return distances[destination];
  }

  // Retorna menor rota da origem e destino passados
  getShortestDistanceRoute(origin, destination) {
    let shortestRoute = 0;

    //Se origem for igual ao destino, somar distância inicial antes para evitar que o retorno da menor distância seja 0
    if (origin === destination) {
      let routesDistances = this.nodes.filter(node => node.from === origin).map(node => {
        return node.distance + this.dijkstra(node.to, destination);
      });
      shortestRoute = Math.min(...routesDistances);
    } else {
      shortestRoute = this.dijkstra(origin, destination);
    }
    if (!isFinite(shortestRoute)) throw new Error("Route doesn't exists");

    return shortestRoute;
  }


}
