import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import dbfunction from "./confixDB.js";

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(3000, console.log("server is runing on port 3000"));

app.post("/api/get", async (req, res) => {
  const form = req.body;

  try {
    const data = await dbfunction.getData({
      table: form.typeunitname,
      key: form.id,
    });

    if (data.status == 200) {
      res.status(200).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

app.post("/api/add", async (req, res) => {
  const form = req.body;

  try {
    const data = await dbfunction.setData({
      table: form.typeunitname,
      json: form.data,
    });

    if (data.status == 200) {
      res.status(200).json(data);
    } else {
      res.status(data.status).json(data);
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

app.post("/api/edit", async (req, res) => {
  const form = req.body;

  try {
    const data = await dbfunction.updateData({
      table: form.typeunitname,
      key: form.id,
      json: form.data,
    });

    if (data.status == 200) {
      res.status(200).json(data);
    } else {
      res.status(data.status).json(data);
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

app.post("/api/delete", async (req, res) => {
  const form = req.body;

  try {
    const data = await dbfunction.deleteData(form);

    if (data.status == 200) {
      res.status(200).json(data);
    } else {
      res.status(data.status).json(data);
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});
