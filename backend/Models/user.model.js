const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    avatar: String,
    email: String,
  },
  { timestamps: true },
  { versionkey: false }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
