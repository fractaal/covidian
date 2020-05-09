module.exports = {
  getDeltas(_new, old) {
    let delta = {}
    for (let key in _new) {
      if (_new[key] && old[key]) { // If key exists in both tables

        if (typeof _new[key] === "number" && typeof old[key] === "number") {
          delta[key] = _new[key] - old[key]
          if (delta[key] > 0) delta[key] = "+" + delta[key];
          if (delta[key] === 0) delta[key] = "";
        }
  
        if (typeof _new[key] === "object" && typeof old[key] === "object") {
          delta[key] = this.getDeltas(_new[key], old[key]);
        }

      }
    }
    return delta;
  },

  stripDeltas(object) {
    for (let key in object) {
      if (key === "delta") {
        delete object[key];
      } else if (typeof key === "object") {
        this.stripDeltas(object[key]);
      }
    }

    return object;
  },
}