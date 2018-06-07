"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
let port = process.env.PORT;
if (port == undefined)
    port = 8200;
let server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);
function handleRequest(_request, _response) {
    console.log("Ich höre Stimmen!");
    let query = Url.parse(_request.url, true).query;
    console.log(query["command"]);
    if (query["command"]) {
        switch (query["command"]) {
            case "insert":
                insert(query, _response);
                break;
            case "refresh":
                refresh(_response);
                break;
            case "search":
                search(query, _response);
                break;
            default:
                error();
        }
    }
}
function insert(query, _response) {
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
    Database.insert(studi);
    respond(_response, "Daten empfangen");
}
function refresh(_response) {
    Database.findAll(function (studi) {
        let line;
        for (let i = 0; i < studi.length; i++) {
            line += "(" + studi[i]._id + ")" + studi[i].matrikel + ": ";
            line += studi[i].studiengang + ", " + studi[i].name + ", " + studi[i].firstname + ", " + studi[i].age + " Jahre ";
            line += studi[i].gender ? "(M)" : "(F)";
        }
        respond(_response, line);
    });
}
function search(query, _response) {
    let studi = studiHomoAssoc[query["searchFor"]];
    if (studi) {
        let line = query["searchFor"] + ": ";
        line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
        line += studi.gender ? "(M)" : "(F)";
        _response.write(line);
    }
    else {
        _response.write("No Match");
    }
}
function error() {
    alert("Error");
}
function respond(_response, _text) {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map