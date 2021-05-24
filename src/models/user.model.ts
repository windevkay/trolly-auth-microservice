import mongoose, { Schema, Document, Model } from "mongoose";

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

userSchema.statics.build = (params: UserAttributes) => {
  return new User(params);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export { User, IUser };
