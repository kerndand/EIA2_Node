import * as Mongo from "mongodb";
console.log("Database starting");

let databaseURL: string = "mongodb://localhost:27017";
let databaseName: string = "Test";
let db: Mongo.Db;
let students: Mongo.Collection;
// wenn wir auf heroku sind...
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://testuser:testpassword1@ds141870.mlab.com:41870/eia2_data";
    databaseName = "eia2_data";
}

// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, handleConnect);


function handleConnect(_e: Mongo.MongoError, _db: Mongo.Db): void {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}

export function insert(_doc: Studi): void {
    students.insertOne(_doc, handleInsert);
}

function handleInsert(_e: Mongo.MongoError): void {
    console.log("Database insertion returned -> " + _e);
}


export function findAll(_callback: Function): void {
    var cursor: Mongo.Cursor = students.find();
    cursor.toArray(prepareAnswer);

    function prepareAnswer(_e: Mongo.MongoError, studentArray: Studi[]): void {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
            
    }
}

export function findStudent(searchedMatrikel: number, _callback: Function): void {    
    var myCursor: Mongo.Cursor = students.find({"matrikel": searchedMatrikel}).limit(1);
    myCursor.toArray(prepareStudent);
    
    function prepareStudent(_e: Mongo.MongoError, students: Studi[]): void {
        if (_e) {
            _callback("Error" + _e);
        }
        
        if (students.length == 1) {
            _callback(JSON.stringify(myCursor));
        } else {
            _callback("No Match");
        }
            
    }
}
