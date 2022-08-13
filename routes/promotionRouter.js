const express = require("express");
const Promotion = require("../models/promotion");

const cors = require("./cors");

const promotionRouter = express.Router();
const authenticate = require("../authenticate");

promotionRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.find()
      .then((promotions) => {
        res.statusCode = 200;
        res.header("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end(
        `Will add the promotion: ${req.body.name} with description: ${req.body.description}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /promotions");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end("Deleting all promotions");
    }
  );

promotionRouter
  .route("/:promotionId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => {
        res.statusCode = 200;
        res.header("Content-Type", "application/json");
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end(
        `POST operation not supported on /promotion/${req.params.promotionId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end(
        `Will update the promotions: ${req.body.name} with description ${req.body.description}`
      );
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end(`Deleting promotion of id: ${req.params.promotionId}`);
    }
  );

module.exports = promotionRouter;
