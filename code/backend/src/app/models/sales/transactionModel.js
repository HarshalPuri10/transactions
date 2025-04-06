import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: false },
    amount: { type: Number, required: false },
    type: { type: String, enum: ["income", "expense"], required: false },
    category: { type: String, required: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "Transaction",
    versionKey: false,
  }
);

export default model("Transaction", transactionSchema);
