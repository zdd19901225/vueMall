// db.workmate.find(
//     {'skill.skillOne':'HTML+CSS'},
//     {name:true,'skill.skillOne':true,_id:false}
// )

// db.workmate.find(
//     {age:{$lte:30,$gte:18}},
//     {name:true,age:true,_id:false}
// )
// var startTime = new Date('2020-03-11');
// db.workmate.find(
//     {regeditTime:{$lt:startTime}},
//     {name:true,_id:false}
// )

// db.workmate.find(
//     {age:{$in:[25,30,33]}},
//     {name:1,age:1,_id:0}
// )
// db.workmate.find(
//     {$or:[
//         {age:{$lte:25}},
//         {'skill.skillThree':'PHP'}
//     ]},
//     {name:1,'skill.skillThree':1,age:1,_id:0}
// )
// db.workmate.find(
//     {$and:[
//         {age:{$lte:30}},
//         {'skill.skillThree':'PHP'}
//     ]},
//     {name:1,'skill.skillThree':1,age:1,_id:0}
// )
db.workmate.find(
    {age:{$not:{$lt:30}}},
    {name:1,age:1,_id:0}
)