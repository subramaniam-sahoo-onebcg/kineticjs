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

  var chipsImages = {
    1: 'whiteChip.png',
    2: 'yellowChip.png',
    5: 'redChip.png',
    10: 'blueChip.png',
    20: 'greyChip.png',
    25: 'greenChip.png',
    100: 'blackChip.png'
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


  /*Create Chip Denominations */
  function drawChips(amount) {

    var chipsImg = {};
    var kineticimg2 = {};
    var clone = {};
    var x = 431;
    for (var key in chipsImages) {
      console.log(x);
      if (chipsImages.hasOwnProperty(key)) {
        //console.log(chipsImages[key]);

        chipsImg[key] = new Image();
        //  console.log(chipsImages[key]);
        chipsImg[key].onload = function() {

          kineticimg2[key] = new Kinetic.Image({
            x: x,
            image: chipsImg[key],
            width: 20,
            height: 20
          });

          var y = 298;
       //   for (var i = 1; i <= 1; i++) {
            clone[key] = kineticimg2[key].clone({y: y});
            layer.add(clone[key]);

         // }
          stage.add(layer);

        };

        chipsImg[key].src = 'images/whiteChip.png';

      }
      x = x - 10;
      // console.log(chipsImg);
    }


console.log(chipsImg);



  }
  $(function() {
    drawChips(200);
  });
  /*Card Animations */
  function CardAnimations() {
    var cardObj = new Image();
    var p = co_ordinates.table9.cards;

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
            duration: 0.05,
            x: playercard.x + cardoffset,
            y: playercard.y
          });
          tween.play();
        }

        console.log(counter);
        if (counter >= co_ordinates.table9.cards.length * 2)
          clearInterval(int);
        counter++;
      }, 100);

    };

    cardObj.src = 'images/Card.png';
  }



