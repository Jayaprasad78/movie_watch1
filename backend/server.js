const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const cors = require('cors');

// Use CORS middleware to allow requests from specified origin
server.use(cors({
  origin: ["https://deploy-mern-frontend.vercel.app"],
  methods: ["POST", "GET","DELETE","PUT"],
  credentials: true
}));

const middlewares = jsonServer.defaults({
  static: "./build"
});

const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
);
 server.get("/", (req, res) => {
    res.json("Hello");
})


server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
