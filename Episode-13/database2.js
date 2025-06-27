// mytesting

require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("fs");
const client = new MongoClient(process.env.MONGO_URI);
// console.log(process.env.MONGO_URI);

const run = async () => {
  try {
    await client.connect();
    console.log("Connection has been done! ");
    const dbName = "NodeApp";
    const db = client.db(dbName);
    const collection = db.collection("NodeAppCollection");
    let count = readCounter();
    console.log("Current counter value:", count); // Debug log
    await addData(collection, count);
    await showData(collection);
    updateCounter();
  } catch (error) {
    console.log(error);
  }
};

const readCounter = () => {
  try {
    const data = fs.readFileSync("./counter.txt", "utf-8");
    return parseInt(data, 10) || 0;
  } catch (error) {
    // If file does not exist or is empty, start from 0
    return 0;
  }
};

const updateCounter = () => {
  const newCount = readCounter() + 1;
  fs.writeFileSync("./counter.txt", newCount.toString(), "utf-8");
  console.log("count has been updated!");
};

const addData = async (collection, count) => {
  try {
    await collection.insertOne({ name: `Node App ${count}`, Details: count % 2 == 0 ? true : false });
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
