export default class Node {
  constructor(value) {
    this.data = value;
    this.links = [];
  }

  addLink(node) {
    this.links.push(node);
  }

  getLinks() {
    if (this.links.length === 0) {
      return [];
    }
    return this.links;
  }

  getData() {
    return this.data;
  }
}
