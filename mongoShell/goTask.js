// import { connect } from "tls";

var userName = 'zdd';
var timeStamp = Date.parse(new Date());
var jsonDatabase = {"loginName":userName,"loginTime":timeStamp};

var db = connect('log');//连接（创建）数据库,相当于use log
db.login.insert(jsonDatabase);//创建集合login，插入数据

print('[demo]log print success');