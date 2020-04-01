let startTime = (new Date()).getTime();
var db = connect('log');

// for(var i=0; i<1000; i++){
//     db.test.insert({'num':i})
// }

let arrays = [];
for(var i=0; i<1000; i++){
    arrays.push({num:i});
}
db.test.insert(arrays);

let runTime = (new Date()).getTime() - startTime;
print('[DEMO] run time is '+runTime+' ms');