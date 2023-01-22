import express from "express";
const router = express.Router();
import Survey from "../model/survey.js";

const logHeader = (req, res, next) => {
  console.log(req.headers);
  next();
};

router.get("/", logHeader, (req, res) => {
  Survey.find({}, (err, result) => {
    if (err) res.status(500).json({ err: err.message });
    res.json({ Surveys: result });
  });
});

router.post("/create", (req, res) => {
  if ((req.body.title, req.body.questions)) {
    Survey.create(
      {
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
      },
      (err, result) => {
        if (err) res.status(400).json({ err: err.message });
        console.log(result);
        res.json({ message: result });
      }
    );
  } else {
    res.json({ error: "title is not defined" });
  }
});

router.post("/update/:id", (req, res) => {
  Survey.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

router.get("/surveys/:id", (req, res) => {
  Survey.findById(req.params.id, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

router.get("/find/:title", (req, res) => {
  const exact = req.query?.exact || false;

  Survey.find(
    { title: exact ? req.params.title : { $regex: req.params.title } },
    (err, result) => {
      if (err) res.status(400).json({ err: err.message });
      else {
        res.json({ result: result });
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  Survey.findById(req.params.id, (err, result) => {
    if (result == null) {
      res.status(404).json({ err: "Survey not found" });
    } else {
      Survey.deleteOne({ _id: req.params.id }, () => {
        if (err) res.status(400).json({ err: err.message });
        else {
          res.json({ result: result });
        }
      });
    }
  });
});

export default router;
