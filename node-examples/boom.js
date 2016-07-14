
var h1 = function(x){
  return (x*x + x*x*x) % 32;
}

var h2 = function(x){
  return ((x*x + x*x*x)*2) % 32;
}

var h3 = function(x){
  return ((x*x + x*x*x)*3) % 32;
}

console.log("-----2010---------");

console.log(h1(2010));
console.log(h2(2010));
console.log(h3(2010));
console.log("----2013---------");
console.log(h1(2013));
console.log(h2(2013));
console.log(h3(2013));
console.log("----2007---------");

console.log(h1(2007));
console.log(h2(2007));
console.log(h3(2007));
console.log("----2004---------");

console.log(h1(2004));
console.log(h2(2004));
console.log(h3(2004));

console.log("-----2001---------");

console.log(h1(2001));
console.log(h2(2001));
console.log(h3(2001));

console.log("-----1998---------");

console.log(h1(1998));
console.log(h2(1998));
console.log(h3(1998));

console.log("-----3200---------");

console.log(h1(3200));
console.log(h2(3200));
console.log(h3(3200));
