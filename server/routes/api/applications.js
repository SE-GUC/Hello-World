const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load Models
const Application = require("../../models/Application");
const Partner = require("../../models/Partner");
const Consultant = require("../../models/Consultant");
const Admin = require("../../models/Admin");

// Validation
const validator = require("../../validation/applicationsValidation");

// @route   POST api/applications/:id
// @desc    Submits an Application of a task
// @access  Private
router.post("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).send({ error: "Partner not found" });

    const isValidated = validator.submitValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const fields = {};
    fields.partner = req.params.id;
    fields.description = req.body.description;
    fields.needConsultancy = req.body.needConsultancy;

    const newApp = await Application.create(fields);
    return res.json({
      msg: "Application was created successfully",
      data: newApp
    });
  } catch (error) {
    return res.status(404).json(error);
  }
});

// @route   PUT api/applications/:id/:appID
// @desc    Partner Edits an Application of a task
// @access  Private
router.put("/:id/:appID", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner)
      return res.status(404).send({ error: "Partner does not exist" });
    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application does not exist" });

    if (application.partner != req.params.id) {
      return res.status(400).json({
        Unauthorized: "This Partner is not responsible for this Application"
      });
    }

    if (application.reviewed) {
      return res
        .status(400)
        .json({ error: "Cant edit application after it has been reviewed" });
    }

    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const fields = {};
    fields.needConsultancy = req.body.needConsultancy;
    fields.description = req.body.description;
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.appID,
      { $set: fields }
    );
    return res.json({ msg: "Application updated successfully" });
  } catch (error) {
    return res.status(404).json({ partnernotfound: "Partner not found" });
  }
});

// @route   POST api/applications/partner/negotiate/:id/:appID
// @desc    Partner Negotiates Over An Application
// @access  Private
router.post("/partner/negotiate/:id/:appID", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).populate(
      "organization"
    );
    if (!partner) return res.status(404).send({ error: "Partner not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    const isValidated = validator.messageValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const newMessage = {
      status: "partner",
      text: req.body.text,
      name: partner.organization.name
    };
    application.messages.unshift(newMessage);

    application.save();

    return res.json({
      msg: "Message Sent successfully",
      data: application.messages
    });
  } catch (error) {
    res.status(404).json({ partnernotfound: "Partner not found" });
    console.log(error);
  }
});

// @route   GET api/applications/partner/negotiation/:id/:appID
// @desc    Views Negotiation Over An Application
// @access  Private
router.get("/partner/negotiation/:id/:appID", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id).populate(
      "organization"
    );
    if (!partner) return res.status(404).send({ error: "Partner not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    return res.json({ data: application.messages });
  } catch (error) {
    return res.status(404).json({ partnernotfound: "Partner not found" });
  }
});

// @route   GET api/applications/admin/:id
// @desc    Gets All Applications
// @access  Private
router.get("/admin/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ error: "Admin not found" });

    const applications = await Application.find({});
    return res.json({ data: applications });
  } catch (error) {
    return res.status(404).json({ adminnotfound: "Admin not found" });
  }
});

// @route   POST api/applications/admin/:id/appID
// @desc    Admin Reviews Application
// @access  Private
router.post("/admin/:id/:appID", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ error: "Admin not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    application.reviewed = true;

    application.save();

    return res.json({
      msg: "Application Reviewed Successfully",
      data: application
    });
  } catch (error) {
    return res.status(404).json({ adminnotfound: "Admin not found" });
  }
});

// @route   GET api/applications/admin/:id/appID
// @desc    Admin gets Application
// @access  Private
router.get("/admin/:id/:appID", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ error: "Admin not found" });

    const application = await Application.findById(req.params.appID).populate({
      path: "partner",
      populate: { path: "organization" }
    });
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    return res.json({ data: application });
  } catch (error) {
    res.status(404).json({ adminnotfound: "Admin not found" });
    console.log(error);
  }
});

// @route   POST api/applications/admin/negotiate/:id/:appID
// @desc    Admin Negotiates Over An Application
// @access  Private
router.post("/admin/negotiate/:id/:appID", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ error: "Admin not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    const isValidated = validator.messageValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const newMessage = {
      status: "admin",
      text: req.body.text,
      name: admin.name
    };
    application.messages.unshift(newMessage);

    application.save();

    return res.json({
      msg: "Message Sent successfully",
      data: application.messages
    });
  } catch (error) {
    return res.status(404).json({ partnernotfound: "Admin not found" });
  }
});

// @route   GET api/applications/admin/negotiation/:id/:appID
// @desc    Views Negotiation Over An Application
// @access  Private
router.get("/admin/negotiation/:id/:appID", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ error: "Admin not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    return res.json({ data: application.messages });
  } catch (error) {
    return res.status(404).json({ adminnotfound: "Admin not found" });
  }
});

// @route   GET api/applications/consultant/all/:id
// @desc    Gets All Reviewed Applications
// @access  Private
router.get("/all/:id", async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    if (!consultant)
      return res.status(404).send({ error: "Consultant not found" });

    const applications = await Application.find({ reviewed: true });
    return res.json({ data: applications });
  } catch (error) {
    return res.status(404).json({ consultantnotfound: "Consultant not found" });
  }
});

// @route   GET api/applications/consultant/:id/appID
// @desc    Consultant gets Application
// @access  Private
router.get("/consultant/:id/:appID", async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    if (!consultant)
      return res.status(404).send({ error: "Cosnultant not found" });

    const application = await Application.findById(req.params.appID).populate({
      path: "partner",
      populate: { path: "organization" }
    });
    if (!application)
      return res.status(404).send({ error: "Application not found" });
    if (!application.reviewed)
      return res.status(404).send({ error: "Application not Reviewed" });

    return res.json({ data: application });
  } catch (error) {
    res.status(404).json({ consultantnotfound: "Consultant not found" });
    console.log(error);
  }
});

// @route   POST api/applications/apply/:id/:appID
// @desc    Apply For an Application
// @access  Private
router.post("/apply/:id/:appID", async (req, res) => {
  try {
    const consultant = await Consultant.findById(req.params.id);
    if (!consultant)
      return res.status(404).send({ error: "Consultant not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    const applicant = {
      consultant: req.params.id,
      status: "pending"
    };

    application.applicants.unshift(applicant);
    application.save();

    return res.json({
      msg: "Your Application was submitted successfully",
      data: application.applicants
    });
  } catch (error) {
    res.status(404).json({ consultantnotfound: "Consultant not found" });
    console.log(error);
  }
});

// @route   POST api/applications/respond/:id/:id2/:id3
// @desc    Admin Responds to Consultant Requests
// @access  Private
router.post("/respond/:id/:id2/:appID", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).send({ error: "Admin not found" });

    const consultant = await Consultant.findById(req.params.id2);
    if (!admin) return res.status(404).send({ error: "Consultant not found" });

    const application = await Application.findById(req.params.appID);
    if (!application)
      return res.status(404).send({ error: "Application not found" });

    const isValidated = validator.respondValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const applicant = application.applicants.find(element => {
      return element.consultant == req.params.id2;
    });

    if (!applicant)
      return res
        .status(404)
        .json({ error: "This Consultant did not apply for This Task" });

    applicant.status = req.body.response;

    application.save();

    return res.json({ msg: "Response Saved", data: applicant });
  } catch (error) {
    res.status(404).json({ adminnotfound: "Admin not found" });
    console.log(error);
  }
});

module.exports = router;