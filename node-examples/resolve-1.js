var rect = require('./rect-1');

function resolveRect(l,b){
  console.log("Solving Rect with l= " + l + " b= " + b );
  if (l<=0 || b<=0){
    console.log("Can't solve Rect with l= " + l + " b= " + b );
  }
  else{
    console.log("perimeter = " + rect.perimeter(l,b)+ " area = "+ rect.area(l,b));
  }
}

resolveRect(1,2);
resolveRect(4,5);
resolveRect(-1,2);
