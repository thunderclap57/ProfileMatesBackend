const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    dob: { type: String },
    image: { type: String },
    awards: { type: String },
    linkedIn: { type: String },
    certifications: { type: String },
    gitHub: { type: String },
    hackerRank: { type: String },
    skills: {
      skill1: { type: String },
      skill2: { type: String },
      skill3: { type: String },
      skill4: { type: String },
      skill5: { type: String },
      skill6: { type: String },
    },
    education: {
      Primary: {
        Institution_name: { type: String, require: true },
        Year_of_pass: { type: String, require: true },
        Score: { type: String, require: true },
      },
      Higher: {
        Institution_name: { type: String, require: true },
        Year_of_pass: { type: String, require: true },
        Score: { type: String, require: true },
      },
      UG: {
        Institution_name: { type: String, require: true },
        Year_of_pass: { type: String, require: true },
        Score: { type: String, require: true },
      },
      PG: {
        Institution_name: { type: String },
        Year_of_pass: { type: String },
        Score: { type: String },
      },
    },
    languages_known: {
      language1: { type: String },
      language2: { type: String },
      language3: { type: String },
      language4: { type: String },
    },

    references: [
      {
        name: { type: String },
        contact: { type: String },
      },
    ],
    projects: [
      {
        name: { type: String },
        image: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Details", detailsSchema);
