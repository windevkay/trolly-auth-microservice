import mongoose, { Schema, Document, Model } from "mongoose";

import { PasswordService } from "../services";

interface UserAttributes {
  email: string;
  password: string;
}

interface IUser extends Document, UserAttributes {}

interface UserModel extends Model<IUser> {
  build(params: UserAttributes): IUser;
}

const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // restrict certain fields from being returned in JSON responses
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordService.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (params: UserAttributes) => {
  return new User(params);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export { User, IUser };
