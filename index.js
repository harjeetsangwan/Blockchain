const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const Blockchain = require("./blockchain");
//const PubSub = require("./publishsubscribe");
const P2pServer= require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const blockchain = new Blockchain();
//const pubsub = new PubSub({ blockchain })
const p2pServer = new  P2pServer(blockchain);



app.use(bodyParser.json());
app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/mine", (req, res) => {
  console.log('above data');
  console.log(req.body.data);
  const  {data}  = req.body.data;
  const block= blockchain.addBlock({data:req.body.data});
  p2pServer.syncChains();
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log(`listening to PORT:${HTTP_PORT}`);
 // synChains();
});
p2pServer.listen();

