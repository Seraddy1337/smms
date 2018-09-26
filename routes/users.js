var express = require('express');
var router = express.Router();
// 连接服务器
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost', 
  user     : 'root',   
  password : 'root', 
  database : 'admin'  
})
connection.connect(()=>{
  console.log("服务器连接成功")
});
// 接收用户添加请求
router.post("/addUser",(req,res)=>{
  let {username,password,groups}=req.body;
  const sqlStr="insert into users(username,password,groups) values(?,?,?)";
  const sqlParams = [username, password, groups]
  connection.query(sqlStr,sqlParams, (err,data) => {
    if(err){
      throw err;
    } else {
      if (data.affectedRows > 0) {
        // 响应一个成功的数据对象回去
        res.send({"errcode": 1, "msg":"添加成功!"})
      } else {
        // 否则 就是插入失败 响应一个失败的数据对象回去
        res.send({"errcode": 0, "msg":"添加失败!"})
      }
    }
  })

})
// 接收用户列表全部数据取用请求
router.get("/addList",(req,res)=>{
  const sqlStr = 'select * from users order by ctime desc';
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
    } else{
      res.send(data)
    }
  })
})
module.exports = router;
