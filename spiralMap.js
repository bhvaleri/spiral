var fillGrid = function (num) {
  var grid = $('#grid');

  for (var i = 0; i < num; i++) {
    grid.append("<li class=\"tile\"></li>");
  }
};

var spiralMapping = function (m, n) {
  var baseHeight = 0,
      baseWidth = 0,
      maxHeight = n - 1,
      maxWidth = m - 1;
  var i;
  var count = 0;
  var indices = [];

  while (maxHeight > 1|| maxWidth > 1) {
    
    for (i = baseWidth; i <= maxWidth; i++) {
      indices.push({x: i,y: baseHeight});
    }
    
    for (i = baseHeight + 1; i <= maxHeight; i++) {
      indices.push({x: maxWidth, y: i});
    }
    
    for (i = maxWidth - 1; i >= baseWidth; i--) {
      indices.push({x: i, y: maxHeight});
    }
    
    for (i = maxHeight - 1; i > baseHeight; i--) {
      indices.push({x: baseWidth, y: i});
    }

    maxHeight -= 1;
    maxWidth -= 1;
    baseHeight++;
    baseWidth++;
  }
  
  return indices;
};

fillGrid(1600);

var colorChange = function (x,y, color, gridLength) {
  var grid = $('#grid');


  var index = gridLength*x + y;

  grid.children().eq(index).css('background-color', color);
};


var paintGrid = function () {
  var indices = spiralMapping(40,40);
  var i = 0;
  console.log(indices.length);    

  var forwardBlue = function () {
    if (i < indices.length) {
      colorChange(indices[i].x, indices[i].y, 'red', 40);
      i++;
      setTimeout(forwardBlue, 100);
    }
    else {
      i--;
      setTimeout(backwardRed, 100);
    }
  } 

  var backwardRed = function () {
    if (i >= 0) {
      colorChange(indices[i].x, indices[i].y, 'blue', 40);
      i--;
      setTimeout(backwardRed, 100);
    }
    else {
      i++;
      setTimeout(forwardBlue, 100);
    }
  } 


  forwardBlue();
};
//to make this better, need a more customizable forward backward that can take
//colors so you can get some different coloured spirals running at the same
//time and same direction

paintGrid();
