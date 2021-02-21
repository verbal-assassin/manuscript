let repetitions = 20;

function setup() {
  createCanvas(1000, 720);
  stroke('hsb(234, 90%, 35%)');
  background('hsb(47, 6%, 95%)');
  noFill();

  line(0, 0, width, height)
  drawTriangle({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: height,
    x3: width,
    y3: height,
  }, repetitions);
  drawTriangle({
    x1: 0,
    y1: 0,
    x2: width,
    y2: height,
    x3: width,
    y3: 0,
  }, repetitions);
}

function promptTriangle(points, repeats) { 
  const ran = random(0.3, 0.7)
  
  const newPoint = {
    x: points.x1 * ran + points.x2 * (1 - ran),
    y: points.y1 * ran + points.y2 * (1 - ran)
  }
  line(newPoint.x, newPoint.y, points.x3, points.y3, repeats)
  
  drawTriangle({
    x1: points.x1,
    y1: points.y1,
    x2: newPoint.x,
    y2: newPoint.y,
    x3: points.x3,
    y3: points.y3
  }, repeats - 1)
  drawTriangle({
    x1: newPoint.x,
    y1: newPoint.y,
    x2: points.x2,
    y2: points.y2,
    x3: points.x3,
    y3: points.y3
  }, repeats - 1)
}

function drawTriangle(starting, repeats) {
  if (repeats == 0) {
    return;
  } else if (repeats == 17) {
    repeats = parseInt(randomGaussian(13, 1))
  }

  if (random() * repeats < 0.01) {
    repeats += 1
  }

  const line1 = lineLength(starting.x2, starting.y2, starting.x3, starting.y3);
  const line2 = lineLength(starting.x1, starting.y1, starting.x3, starting.y3);
  const line3 = lineLength(starting.x2, starting.y2, starting.x1, starting.y1);

  if (line2 > line1) {
    if (line3 > line2) {
      promptTriangle({
        x1: starting.x1,
        y1: starting.y1,
        x2: starting.x2,
        y2: starting.y2,
        x3: starting.x3,
        y3: starting.y3,
      }, repeats)
    } else {
      promptTriangle({
        x1: starting.x1,
        y1: starting.y1,
        x2: starting.x3,
        y2: starting.y3,
        x3: starting.x2,
        y3: starting.y2,
      }, repeats)
    }
  } else if (line3 > line1) {
    promptTriangle({
      x1: starting.x1,
      y1: starting.y1,
      x2: starting.x2,
      y2: starting.y2,
      x3: starting.x3,
      y3: starting.y3,
    }, repeats)
  } else {
    promptTriangle({
      x1: starting.x2,
      y1: starting.y2,
      x2: starting.x3,
      y2: starting.y3,
      x3: starting.x1,
      y3: starting.y1,
    }, repeats)
  }
}

function lineLength(x1, y1, x2, y2) {
  return (sqrt(sq(x2 - x1) + sq(y2 - y1)))
}
