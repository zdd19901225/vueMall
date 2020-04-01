var db = connect('company');
// db.workmate.update({name:'zdd'},{$set:{age:20,sex:0}});
// db.workmate.update({name:'JSPang'},{$set:{'skill.SkillThree':'java'}});
// db.workmate.update({name:'zdd'},{$unset:{age:''}});
// db.workmate.update({name:'zdd'},{$set:{age:18}});
// db.workmate.update({name:'zdd'},{$inc:{age:-2}});
db.workmate.update({},{$set:{interset:[]}},{multi:true});