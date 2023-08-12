import express from "express";
import {todos, TodosController} from "./todos.controller";

const router = express.Router();

const todosController: TodosController = new TodosController();

router.get("/", (req, res) => {
  if(todos) {
    res.status(200); // HttpStatus - OK
    res.json(todos);
  } else {
    res.status(404); // HttpStatus - OK
    res.send();
  }
});

router.get("/:id", (req, res) => {
  if(req.params.id !== undefined) {
    const result = todosController.get(parseInt(req.params.id));
    if(result) {
      res.status(200); // HttpStatus - OK
      res.json(result);
    } else {
      res.status(404); // HttpStatus - Not Found
    }
  } else {
    res.status(400); // HttpStatus - Bad Request
    res.send();
  }
});

router.post("/", (req, res) => {

  if(req.body != null) {
    const result = todosController.create(req.body);
    if(result) {
      res.status(201); //HttpStatus - Created
      res.json(result);
    } else {
      res.status(400); // HttpStatus - Bad Request
    }
  } else {
    res.status(400); // HttpStatus - Bad Request
  }
  res.send();
});

router.put("/:id", (req, res) => {
  if(req.params.id && req.body) {
    const result = todosController.update(parseInt(req.params.id), req.body);
    if(result) {
      res.status(202); //HttpStatus - Accepted
      res.json(result)
    } else {
      res.status(400); // HttpStatus - Bad Request
    }
  } else {
    res.status(404); // HttpStatus - Bad Request
    res.send();
  }
});

router.delete("/", (req, res) => {
  if(req.body) {
    req.body.forEach((item: { id: number; }) => {
      res.status(todosController.delete(item.id)?202:406);
      res.send();
    })
  }
  res.status(400);
  res.send();
});

export default router;
