import mongoose, { Schema, Document, Model } from "mongoose";

import { Password } from "../services";

interface UserAttributes {
  email: string;
  password: string;
}

interface IUser extends Document, UserAttributes {}

interface UserModel extends Model<IUser> {
  build(params: UserAttributes): IUser;
}

const userSchema: Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (params: UserAttributes) => {
  return new User(params);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export { User, IUser };
