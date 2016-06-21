module.exports = function(x,y,callback){
  try {
    if (x < 0 || y < 0){
      throw new Error("Rectangle demensions should be great than 0 : l= " + x + " b= " +y);
    }
    else {
      callback(null, {
        perimeter: function(){
          return 2*(x+y);
        },
        area: function(){
          return x*y;
        }
      });
    }
  } catch (e) {
    callback(e, null)
  } finally {

  }
}
