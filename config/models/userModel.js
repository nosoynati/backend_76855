import { Model } from "mongoose";

const userSchema = Model.schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
      index: true
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    githubid: {
      type:String
    },
    password: {
      type: String,
      required: function() {return !this.githubid}
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timeStamps: true,
  }
);

export const User = mongoose.Schema("user-schema", userSchema);
