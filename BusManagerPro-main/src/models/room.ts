import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  userName: string;
  messsage: string;
  timeStamp: Date;
}
export interface IRoom extends Document {
  roomName: string;
  message: [IMessage];
}

const messageSchema: Schema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  messsage: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
});

const roomSchema: Schema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  message: [messageSchema],
});

export default mongoose.model<IRoom>("Room", roomSchema);
