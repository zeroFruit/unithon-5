import { SERVER_KEY } from '../config/FCMPush';
import moment from 'moment';
import FCM from 'fcm-node';
import { mongoose } from '../config/mongodb';

const fcm = new FCM(SERVER_KEY);




function sendEmer(req, res){
    var uid = req.body.uid;

    pool.getConnection(function(err, connection){
      if(err){
        res.send('err');
      }
      var query = connection.query('select token from table where uid='+uid, function(err, rows, fields){
        if(!err){
          for(var i in rows){
            var token = rows[i].token;
            var data=req.body;
            var message = {
                to: token,
                notification: {
                    title: "Emergency", //title of notification
                    body: "제가 위험에 빠졌어요. GPS와 사진을 보고 저를 구해주세요!", //content of the notification
                    sound: "default",
                    icon: "ic_launcher" //default notification icon
                },
                data: data //payload you want to send with your notification
            };
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Notification not sent");
                    res.json({success:false})
                }
            });
          }
          console.log("긴급메시지를 성공적으로 보냈습니다.");
          res.json({"result":"success"})
        }

        else{
          console.log('err');
        }
      });
      connection.release();
    });
};



  function registerUser(req,res){
    var token = req.body.token;
    var uid = moment().format('MMDDmmss') + token.substring(3,7);

    pool.getConnection(function(err, connection){
      if(err){
          res.send('err');
      }
      else{
        connection.query('insert into table set?',{"token":token,},
        function(err, results){
          connection.release();
          if(err){
            if(typeof callback === 'fucntion') callback('err');
          } else{
            if(typeof callback === 'function') callback('suc');
          }
        }
      )}
    })
}
