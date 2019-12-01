module.exports = class Node {
  constructor(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = parseInt(distance);
  }
}