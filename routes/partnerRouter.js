const { application } = require("express");
const express = require("express");
const Partner = require("../models/partner");
const cors = require("./cors");

const partnerRouter = express.Router();
const authenticate = require("../authenticate");

partnerRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.header("Content-Type", "application/json");
        res.json(partners);
      })
      .catch((err) => next(err));
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end(
        `Will add the partner: ${req.body.name} with description: ${req.body.description}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /partners");
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end("Deleting all partners");
    }
  );

partnerRouter
  .route("/:partnerId")
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Partner.findById(req.params.partnerId)
      .then((partner) => {
        res.statusCode = 200;
        res.header("Content-Type", "application/json");
        res.json(partner);
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
        `POST operation not supported on /partner/${req.params.partnerId}`
      );
    }
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end(
        `Will update the partners: ${req.body.name} with description ${req.body.description}`
      );
    }
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res) => {
      res.end(`Deleting partner of id: ${req.params.partnerId}`);
    }
  );

module.exports = partnerRouter;
