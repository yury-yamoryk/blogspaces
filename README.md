# blogspaces

curl -X GET localhost:8080/users
curl -X POST -H "Content-Type: application/json" -d '{"username":"","password":""}' http://localhost:8080/authenticate
curl -X GET -H "Authorization:Bearer " localhost:8080/users

