const { application } = require("express");
const express = require("express");
const Promotion = require("../models/promotion");

const promotionRouter = express.Router();
const authenticate = require("../authenticate");

promotionRouter
  .route("/")
  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.header("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .get((req, res) => {
    res.end("Will send all the promotions to you");
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end(
      `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end("Deleting all promotions");
  });

promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => {
        res.statusCode = 200;
        res.header("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotion/${req.params.promotionId}`
    );
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end(
      `Will update the promotions: ${req.body.name} with description ${req.body.description}`
    );
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end(`Deleting promotion of id: ${req.params.promotionId}`);
  });

module.exports = promotionRouter;
