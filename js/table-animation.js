  /*******************Co-ordinates for table***********************/
  var co_ordinates = {
    table9: {cards:
              [{x: 431, y: 250},
                {x: 251, y: 330},
                {x: 270, y: 527},
                {x: 427, y: 587},
                {x: 666, y: 585},
                {x: 902, y: 585},
                {x: 1077, y: 521},
                {x: 1085, y: 333},
                {x: 909, y: 250}]
              , chips:
              [{x: 466, y: 326},
                {x: 331, y: 336},
                {x: 353, y: 559},
                {x: 465, y: 578},
                {x: 707, y: 575},
                {x: 931, y: 572},
                {x: 1059, y: 556},
                {x: 1070, y: 368},
                {x: 943, y: 328}]
    }
  };
  /*******************Chips Denominations*******************/
  var chipsImages = {
    1: 'whiteChip.png',
    2: 'yellowChip.png',
    5: 'redChip.png',
    10: 'blueChip.png',
    20: 'greyChip.png',
    25: 'greenChip.png',
    100: 'blackChip.png'
  };

  /*******************Create Kinetic Stage*******************/
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

  /*Calculate Chip Denominations */
  function chipbreakBreak(amount) {
    var items = new Array();
    var units = [100, 25, 20, 10, 5, 2, 1];
    $.each(units, function(key, unit) {
      items[unit] = parseInt(amount / unit);
      amount %= unit;
    });
    return items;
  }
  /*******************Load Images*******************/
  function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
      numImages++;
    }
    for (var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if (++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = 'images/' + sources[src];
    }
  }


  loadImages(chipsImages, function(images) {
    loadedImages = images;
  });

  /******************* Chip Denominations *******************/
  function drawChips(amount) {
    var demoninations = chipbreakBreak(amount);

    var x = 466;
    var group = new Kinetic.Group();
    for (var key in loadedImages) {
      if (loadedImages.hasOwnProperty(key)) {
        var cloneChipImage = new Kinetic.Image({
          x: x,
          image: loadedImages[key],
          width: 20,
          height: 20
        });

        var y = 326;
        for (var i = 1; i <= demoninations[key]; i++) {
          var cloneChip = cloneChipImage.clone({y: y - i * 2});
          group.add(cloneChip);
        }
        stage.add(layer);
      }
      if (demoninations[key] > 0)
        x = x - 18;
    }

    var simpleText = new Kinetic.Text({
      x: 426,
      y: 350,
      text: '$' + amount,
      fontSize: 14,
      fontFamily: 'Calibri',
      fill: 'white'
    });

    group.add(simpleText);
    layer.add(group);
    stage.add(layer);


    var tween = new Kinetic.Tween({
      node: group,
      duration: 2,
      x: 333,
      y: 222
    });
    tween.play();
  }
  ;


  /******************* Card Distribution Animation *******************/
  function CardAnimations() {
    var cardObj = new Image();

    cardObj.onload = function() {
      var kineticimg2 = new Kinetic.Image({
        x: 616,
        image: cardObj,
        width: 49,
        height: 70
      });
      var y = 318;
      var i = 0;
      var cardoffset = 0;
      var counter = 0;
      var int = self.setInterval(function() {


        var playercard = co_ordinates.table9.cards[i];
        if (co_ordinates.table9.cards.length <= i) {
          i = 0;
          cardoffset = 10;
        } else {
          i++;
          var cardclone = kineticimg2.clone({y: y});
          layer.add(cardclone);
          stage.add(layer);

          var tween = new Kinetic.Tween({
            node: cardclone,
            duration: 0.10,
            x: playercard.x + cardoffset,
            y: playercard.y
          });
          tween.play();
        }

        console.log(counter);
        if (counter >= co_ordinates.table9.cards.length * 2)
          clearInterval(int);
        counter++;
      }, 200);

    };

    cardObj.src = 'images/Card.png';
  }


