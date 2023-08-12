import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
let todos = [
  {
    id: 1,
    todo: "Take Teddy for a walk",
    completed: false
  }
];
class TodosController {
  constructor() {
    this.currentId = 1;
  }
  get(id) {
    let result = todos.filter((value) => value.id == id);
    if (result && result.length >= 1) {
      return result[0];
    }
    return null;
  }
  create(todo) {
    if (todo) {
      todo.id = this.getNextId();
      todos.push(todo);
      return todo;
    }
    return null;
  }
  update(id, todo) {
    let result = this.get(id);
    if (result) {
      result.todo = todo.todo;
      result.completed = todo.completed;
      return result;
    }
    return null;
  }
  delete(id) {
    const response = this.get(id);
    if (response) {
      todos = todos.filter((value) => value.id !== id);
      return true;
    }
    return false;
  }
  getNextId() {
    if (todos.length == 1 && todos[0].id >= this.currentId) {
      this.currentId++;
    } else if (todos.length > 1) {
      this.currentId = todos[todos.length - 1].id + 1;
    }
    return this.currentId;
  }
}
const router = express.Router();
const todosController = new TodosController();
router.get("/", (req, res) => {
  if (todos) {
    res.status(200);
    res.json(todos);
  } else {
    res.status(404);
    res.send();
  }
});
router.get("/:id", (req, res) => {
  if (req.params.id !== void 0) {
    const result = todosController.get(parseInt(req.params.id));
    if (result) {
      res.status(200);
      res.json(result);
    } else {
      res.status(404);
    }
  } else {
    res.status(400);
    res.send();
  }
});
router.post("/", (req, res) => {
  if (req.body != null) {
    const result = todosController.create(req.body);
    if (result) {
      res.status(201);
      res.json(result);
    } else {
      res.status(400);
    }
  } else {
    res.status(400);
  }
  res.send();
});
router.put("/:id", (req, res) => {
  if (req.params.id && req.body) {
    const result = todosController.update(parseInt(req.params.id), req.body);
    if (result) {
      res.status(202);
      res.json(result);
    } else {
      res.status(400);
    }
  } else {
    res.status(404);
    res.send();
  }
});
router.delete("/", (req, res) => {
  if (req.body) {
    req.body.forEach((item) => {
      res.status(todosController.delete(item.id) ? 202 : 406);
      res.send();
    });
  }
  res.status(400);
  res.send();
});
const app = express();
const API_KEY = "my-secret-api-key";
app.get("/health-check", (req, res) => {
  res.json({ status: "up" });
});
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  if (req.headers["api-key"] === API_KEY) {
    next();
  } else {
    res.status(401);
    res.send();
  }
});
app.use("/", router);
const viteNodeApp = app;
export {
  viteNodeApp
};
