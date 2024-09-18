# Containerize a Node Application

Docker is a open source platform for developing, shipping and running applications. Here, I am going to containerize a simple **Node.js** application.

![Docker](https://img.shields.io/badge/Docker-blue?logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)

## Create Your Node.js Applicaiton

**Step-01:** Create a New Node.js Applicaiton

```bash
npm init -y
```

**Step-02:** Create Required Files and Directories

```bash
touch .dockerignore .gitignore Dockerfile

mkdir src
cd ./src

mkdir controllers public routes

touch app.js server.js
touch ./controllers/userController.js
touch ./routes/userRoutes.js
```

**Step-02:** Prepare Your Node.js Application

```javascript
// ##### app.js file #####
import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

// routes
app.use("/api/v1/users/", userRouter);

export default app;
```

```javascript
// ##### server.js file #####
import app from "./app.js";

// port
const PORT = process.env.PORT || 8000;
const hostname = "0.0.0.0";

app.listen(PORT, hostname, () => console.log("Server is running"));
```

```javascript
// ##### userController.js file #####
const users = [
  {
    id: "1",
    name: "Mr A",
    job: "Teacher",
    salary: 50000,
  },
  {
    id: "2",
    name: "Mr B",
    job: "Developer",
    salary: 100000,
  },
  {
    id: "3",
    name: "Mr C",
    job: "Chess Player",
    salary: 200000,
  },
];

const getAllUsers = (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "get all users successfully",
    data: users,
  });
};

export { getAllUsers };
```

```javascript
// ##### userRoutes.js #####
import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUsers);

export default router;
```

**Step-03:** Modify Your **package.json** File

```json
{
  "main": "./src/server.js",
  "type": "module",
  "scripts": {
    "start": "node ./src/server.js",
    "dev": "node --watch ./src/server.js"
  }
}
```

**Step-04:** Install Dependencies

```bash
npm install express
```

## Containerize Your Node.js Applicaiton

**Step-01:** Prepare **Dockerfile** to Create Docker Image

```bash
FROM node:22-alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 8000
CMD [ "npm", "start" ]
```

**Step-02:** Prepare **.dockerignore** File

```bash
node_modules
.dockerignore
.gitignore
Dockerfile
```

**Step-03:** Build a Docker Image for Your Node Application

```bash
docker build -t your-image-name .
```

**Step-04:** Run the Container Based on Your Image

```bash
docker run -d -p 8000:8000 --name your-container-name your-image-name
```

## Test Your Container

**Step-01:** Check Your Container is Working Okay

```bash
curl 127.0.0.1:8000/api/v1/users
```

If you get the output like below in your terminal, that means your container is running fine.

```json
{
  "status": "success",
  "message": "get all users successfully",
  "data": [
    { "id": "1", "name": "Mr A", "job": "Teacher", "salary": 50000 },
    { "id": "2", "name": "Mr B", "job": "Developer", "salary": 100000 },
    { "id": "3", "name": "Mr C", "job": "Chess Player", "salary": 200000 }
  ]
}
```

**Step-02:** Check Your Container is Working Okay Using Browser

Go to your favorite browser & search for **http://127.0.0.1:8000/api/v1/users** to see the output.

