/*var client = require('mongodb').MongoClient;
var url = 'mongodb+srv://ashtheking8:k3U9BPl1LYWkj9Sg@cluster0.bywesgx.mongodb.net/';
client.connect(url,{ useNewUrlParser: true }, async function(err,db)
{    
    var dbo=db.db("MyDB")
                    databasesList = await client.db().admin().listDatabases();

    var cursor = dbo.collection('MyCollection').find();    
    cursor.each(function (err,doc)
    {
        if(doc!=null)
        console.log(doc);
    });
    db.close();
});*/
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://ashtheking8:k3U9BPl1LYWkj9Sg@cluster0.bywesgx.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(async function(err) {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }

    const dbo = client.db("MyDB");
    const databasesList = await client.db().admin().listDatabases();
    console.log("List of databases:");
    databasesList.databases.forEach(db => {
        console.log("- ", db.name);
    });

    const cursor = dbo.collection('MyCollection').find();
    console.log(cursor)
    cursor.forEach(function(doc) {
        console.log(doc);
    });

    // Close the connection
    client.close();
});
