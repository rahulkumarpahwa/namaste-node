require("dotenv").config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
// console.log(process.env.MONGO_URI);

const run = async () => {
  try {
    await client.connect();
    console.log("Connection has been done! ");
    const dbName = "NodeApp";
    const db = client.db(dbName);
    const collection = db.collection("NodeAppCollection");
    addData(collection);
    showData(collection);
  } catch (error) {
    console.log(error);
  }
};

const addData = async (collection) => {
  try {
    await collection.insertOne({ name: "Node App", Details: true });
  } catch (error) {
    console.log(error);
  }
};

const showData = async (collection) => {
  try {
    const data = await collection.find({}).toArray(); // toArray() method is must. why ? because the find({}) method returns the cursor not the data. This cursor can be used to apply different methods (using dot operator, called as method chaining) and operations on the data stored in the cursor, so that why toArray() method is must.
    const count = await collection.estimatedDocumentCount();
    console.log(count + " is the count of documents as =>");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

run(); 
