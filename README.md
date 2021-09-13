# blogspaces

Please follow these 7 steps to start the project:
1) Install MongoDB locally with default settings
2) git clone https://github.com/yury-yamoryk/blogspaces.git
3) cd into the blogspaces directory
4) Install gradle (e.g. brew install gradle)
5) run 'gradle wrapper'
6) run './gradlew bootRun'
7) open 'localhost:8080'

Testing with curl:
curl -X GET localhost:8080/users
curl -X POST -H "Content-Type: application/json" -d '{"username":"","password":""}' http://localhost:8080/authenticate
curl -X GET -H "Authorization:Bearer " localhost:8080/users



