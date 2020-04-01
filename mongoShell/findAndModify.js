// db.workmate.update({sex:1},{$set:{money:1000}},false,true);
// var resultMsg = db.runCommand({getLastError:1});
// printjson(resultMsg);

var myModify = {
    findAndModify:'workmate',
    query:{name:'zdd'},
    update:{$set:{age:18}},
    new:true
};
var resultMsg = db.runCommand(myModify);
printjson(resultMsg);