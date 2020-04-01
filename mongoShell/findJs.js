var db = connect('company');
var result = db.workmate.find();
result.forEach((res)=>{
    printjson(res);
})