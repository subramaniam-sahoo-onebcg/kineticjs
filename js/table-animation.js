
  var co_ordinates = {table9: {cards: {
        player1: {x: 431, y: 250},
        player2: {x: 251, y: 330},
        player3: {x: 270, y: 527},
        player4: {x: 427, y: 587},
        player5: {x: 902, y: 585},
        player6: {x: 904, y: 585},
        player7: {x: 1077, y: 521},
        player8: {x: 1085, y: 333},
        player9: {x: 909, y: 250}
      }}
  };
  // console.log(Object.keys(co_ordinates.table9.cards).length);
  var stage = new Kinetic.Stage({
    container: 'container',
    width: 1520,
    height: 1241
  });
  var layer = new Kinetic.Layer();

  var imageObj = new Image();
  imageObj.onload = function() {
    var kineticimg = new Kinetic.Image({
      x: 0,
      y: 0,
      image: imageObj,
      width: 1420,
      height: 1041
    });

    // add the shape to the layer
    layer.add(kineticimg);

    // add the layer to the stage
    stage.add(layer);
  };
  imageObj.src = 'images/Table.jpg';

  function createStack(count) {
    var imageObj2 = new Image();
    imageObj2.onload = function() {
      var kineticimg2 = new Kinetic.Image({
        x: 431,
        y: 300,
        image: imageObj2,
        width: 20,
        height: 20
      });

      // add the shape to the layer
      layer.add(kineticimg2);

      var clone = kineticimg2.clone({y: 298});
// add the shape to the layer
      layer.add(clone);
      var clone = kineticimg2.clone({y: 296});
// add the shape to the layer
      layer.add(clone);
      var clone = kineticimg2.clone({y: 294});
// add the shape to the layer
      layer.add(clone);
      layer.add(clone);
      var clone = kineticimg2.clone({y: 292});
// add the shape to the layer
      layer.add(clone);
      layer.add(clone);
      var clone = kineticimg2.clone({y: 290});
// add the shape to the layer
      layer.add(clone);
      layer.add(clone);
      var clone = kineticimg2.clone({y: 288});
// add the shape to the layer
      layer.add(clone);

      stage.add(layer);
    };
    console.log(imageObj);
    //imageObj2.setZIndex(44);
    imageObj2.src = 'images/Red-Chip.png';
  }



    