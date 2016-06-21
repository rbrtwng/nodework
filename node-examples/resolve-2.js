var argv = require('yargs')
  .usage("Usage: node $0 --l=[num] --b=[num]")
  .demand(['l','b'])
  .argv;

var rect = require('./rect-2');

function resolveRect(x, y){
  console.log("Solving Rect with l= " + x + " b="+y);
  rect(x, y, function(error, rectangle){
    if(error){
      console.log(error);
    }
    else {
      console.log("Solved perimeter is " + rectangle.perimeter() + " and area is " + rectangle.area());
    }
  });
}

//resolveRect(1,2);
//resolveRect(4,5);
//resolveRect(-1,2);
resolveRect(argv.l,argv.b);
