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
                {x: 909, y: 250}],
      chips: [{x: 466, y: 326},
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
    0.01: spriteCoordinates.chip_001,
    0.05: spriteCoordinates.chip_005,
    0.25: spriteCoordinates.chip_025,
    1: spriteCoordinates.chip_1,
    5: spriteCoordinates.chip_5,
    10: spriteCoordinates.chip_10,
    25: spriteCoordinates.chip_25,
    100: spriteCoordinates.chip_100,
    1000: spriteCoordinates.chip_1000,
    500: spriteCoordinates.chip_500,
    5000: spriteCoordinates.chip_5000,
    25000: spriteCoordinates.chip_25000,
    250000: spriteCoordinates.chip_250000,
    5000000: spriteCoordinates.chip_5000000,
    10000000: spriteCoordinates.chip_100000000
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

    layer.add(kineticimg);
    stage.add(layer);
  };
  imageObj.src = 'images/Table.jpg';

  /*Calculate Chip Denominations */
  function chipbreakBreak(amount) {
    var amount = amount.toString().split('.');
    var amount1 = parseInt(amount[0]);
    if (amount[1] === undefined)
      var amount2 = 0;
    else
      var amount2 = parseInt(amount[1]);
    var items = new Array();

    //var amount4 = amount;
    if (amount1 >= 25000) {
      console.log('ss');
      var tunits = [10000000, 5000000, 250000, 25000];
      $.each(tunits, function(key, unit) {
        items[unit] = parseInt(amount1 / unit);
        amount1 %= unit;
      });

    }

    var units = [5000, 500, 1000, 100, 25, 10, 5, 1];
    $.each(units, function(key, unit) {
      items[unit] = parseInt(amount1 / unit);
      amount1 %= unit;
    });


    var punits = [25, 5, 1];
    $.each(punits, function(key, unit) {
      items[unit / 100] = parseInt(amount2 / unit);
      amount2 %= unit;
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


//  loadImages(chipsImages, function(images) {
//    loadedImages = images;
//  });

  var spritesImage = {};
  loadImages(['poker_table_sprites.png'], function(sprite) {
    spritesImage = sprite[0];
  });

  setTimeout(function() {
    console.log(spritesImage);
  }, 2000);

  function createImageFromSprite(asset) {
    return {idle: [{
          x: asset.x,
          y: asset.y,
          width: asset.w,
          height: asset.h
        }]};

  }

  /******************* Chip Denominations *******************/
  function drawChips(amount) {
    var demoninations = chipbreakBreak(amount);
    console.log(demoninations);
    var x = 466;
    var group = new Kinetic.Group();
    for (var key in chipsImages) {
      if (chipsImages.hasOwnProperty(key)) {
        var cloneChipImage = new Kinetic.Sprite({
          x: x,
          image: spritesImage,
          animation: 'idle',
          animations: createImageFromSprite(chipsImages[key])
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
  function CardDistribute() {

    var kineticimg2 = new Kinetic.Sprite({
      x: 616,
      image: spritesImage,
      animation: 'idle',
      animations: createImageFromSprite(spriteCoordinates.card_rear_a_large)
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

      if (counter >= co_ordinates.table9.cards.length * 2)
        clearInterval(int);
      counter++;
    }, 200);

  }

  /******************* Card Show Animation *******************/
  var lastcardPos = 625;
  function CardShow(cardarray) {
    console.log(cardarray[0]);
    var firstcard = new Kinetic.Sprite({
      x: lastcardPos,
      y: 338,
      image: spritesImage,
      animation: 'idle',
      animations: createImageFromSprite(cardarray[0])
    });

    layer.add(firstcard);
    stage.add(layer);

    if (cardarray.length === 1) {
      var tween = new Kinetic.Tween({
        node: firstcard,
        duration: 0.2,
        x: lastcardPos + 50,
        y: 338
      });

      tween.play();
      lastcardPos = lastcardPos + 50;
    }



    if (cardarray.length > 2) {
      var i = 0;
      var int = self.setInterval(function() {
        var card = new Kinetic.Sprite({
          x: lastcardPos,
          y: 338,
          image: spritesImage,
          animation: 'idle',
          animations: createImageFromSprite(cardarray[i + 1])
        });

        layer.add(card);
        stage.add(layer);

        var newPosX = lastcardPos + 50;
        var tween = new Kinetic.Tween({
          node: card,
          duration: 0.2,
          x: newPosX,
          y: 338
        });

        tween.play();
        if (i >= 1)
          clearInterval(int);
        i++;
        lastcardPos = newPosX;
        //  console.log(lastcardPos);
      }, 500);
    }
  }

 /******************* Card Show Animation *******************/
 
 