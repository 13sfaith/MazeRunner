class RepopulationHandler {
  constructor() {
    this.mutationRate = 0.5;
    this.mutationChance = 5;
  }

  getNewWeights(list) {
    let modelA = list[list.length - 1];
    let modelB = list[list.length - 2];
    let ret = [];

    let w = 0;
    for (let k = 0; k < modelA.model.layers.length - 2; k++) {
      let a = modelA.model.getLayer(null, k+1).getWeights();
      let b = modelB.model.getLayer(null, k+1).getWeights();

      let layerA = a[0].add(b[0]).div(tf.scalar(2));
      let layerB = a[1].add(b[1]).div(tf.scalar(2));
      //let layerA = a[0];
      //let layerB = a[1];

      ret[w] = layerA;
      w++;
      ret[w] = layerB;
      w++;
    }

    return ret;
  }
}