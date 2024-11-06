echo "127.0.0.1 - 05/Nov/2024:13:04:24 +0000 "GET /status" 200" >> sample.log
echo "127.0.0.1 - 05/Nov/2024:13:04:24 +0000 "GET /status"" >> sample.log
echo "127.0.0.1 - 05/Nov/2024:13:04:24 "GET /status" 200 +0000 " >> sample.log
echo "127.0.0.1 - 05/Nov/2024:13:04:24 "GET /status" +0000 " >> sample.log
echo "10.0.1.4 - 05/Nov/2024:13:04:21 +0000 "GET /index.php" 200" >> sample.log
echo "thrown in /var/www/html/src/Repositories/Connection.php on line 78" >> sample.log
echo "#3 {main}" >> sample.log

filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/laravel/*.log

  processors:
   - drop_event:
       when:
         regexp:
           message: "(?i)GET /status 200"