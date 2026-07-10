import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    // isVerified is always true for new registrations (email
    // verification was removed). The field remains for backwards
    // compatibility — the login controller no longer blocks
    // unverified accounts since there's no verify flow.
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Incremented on password reset to invalidate all existing
    // JWTs. Checked in the protect middleware on every request.
    tokenVersion: {
      type: Number,
      default: 0,
    },
    // 5 x bcrypt-hashed 6-digit backup codes. Generated on
    // registration, consumed one at a time via /use-backup-code.
    backupCodes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
