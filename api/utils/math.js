const pythagoras = (x0,y0,x1,y1) => {
    var delta_x = x1 - x0;
    var delta_y = y1 - y0;
    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

module.exports = {
    pythagoras
};