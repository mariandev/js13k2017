function Camera() {
  if(Camera.instance) throw "";

  var self = this;

  Camera.instance = self;

  self.position = {};
}

Camera.instance = null;