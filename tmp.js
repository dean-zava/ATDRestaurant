function fa () {
    this.a = 1;
}
  
var fb = new fa();

fa.a = 2;
fa.prototype.a = 3;

var fd = fa;
var fc = new fa();

console.log(fa.a, fb.a, fc.a, fd.a, fa.prototype.a);


//   let p = new Proxy(fb, {
//    get(target, key) {
//     return target[key] +1;
//     }
//    });
//   console.log(p.a);
  
//   fb.a = 2;
//   console.log(p.a, fb.a, fa.a);
  
//   p.a = 3;
//   console.log(p.a, fb.a, fa.a);