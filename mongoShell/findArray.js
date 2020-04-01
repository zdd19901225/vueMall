db.workmate.find(
    {interest:'画画'},
    {name:true,interest:true,_id:false}
)
db.workmate.find(
    {interest:{$all:['画画','看电影']}},
    {name:true,interest:true,_id:false}
)
db.workmate.find(
    {interest:{$in:['画画','看电影']}},
    {name:true,interest:true,_id:false}
)
db.workmate.find(
    {interest:{$size:5}},
    {name:true,interest:true,_id:false}
)
db.workmate.find(
    {},
    {name:true,interest:{$slice:1},_id:false}
)
db.workmate.find(
    {},
    {name:true,age:true,_id:false}
).limit(5).skip(1).sort({age:1})

db.workmate.find(
    {$where:'this.age>30'},
    {name:1,age:1,_id:0}
)