"use strict";
const Http = require("http");
const Url = require("url");
// IMPORT HAT BEI MIR NICHT FUNKTIONIERT
var Server;
(function (Server) {
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    let studiHomoAssoc = {};
    let port = process.env.PORT;
    if (port == undefined)
        port = 8200;
    let server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
        console.log("Ich höre?");
    }
    function handleRequest(_request, _response) {
        console.log("Ich höre Stimmen!");
        let query = Url.parse(_request.url, true).query;
        console.log(query["command"]);
        if (query["command"]) {
            switch (query["command"]) {
                case "insert":
                    insert();
                    break;
                case "refresh":
                    refresh();
                    break;
                //                case "search":
                //                    search();
                //                    break;
                default:
                    error();
            }
        }
        function insert() {
            let obj = JSON.parse(query["data"]);
            let _name = obj.name;
            let _firstname = obj.firstname;
            let matrikel = obj.matrikel.toString();
            let _age = obj.age;
            let _gender = obj.gender;
            let _studiengang = obj.studiengang;
            let studi;
            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(matrikel),
                age: _age,
                gender: _gender,
                studiengang: _studiengang
            };
            studiHomoAssoc[matrikel] = studi;
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write("Daten empfangen");
            _response.end();
        }
        function refresh() {
            console.log(studiHomoAssoc);
            for (let matrikel in studiHomoAssoc) {
                let studi = studiHomoAssoc[matrikel];
                let line = matrikel + ": ";
                line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
                line += studi.gender ? "(M)" : "(F)";
                console.log(line);
                let data = JSON.stringify(line);
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(data);
                _response.end();
            }
        }
        function error() {
            alert("Error");
        }
    }
})(Server || (Server = {}));
//# sourceMappingURL=Server.js.map