const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        image: { type: String, default: "" },
        category: { type: String, default: "" },
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address", // Linked to Address model
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "NetBanking"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

// Virtual field → dynamically calculate
orderSchema.virtual("calculatedTotal").get(function () {
  return this.orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});

// Pre-save hook → auto-update totalPrice
orderSchema.pre("save", function (next) {
  this.totalPrice = this.calculatedTotal;
  next();
});

module.exports = mongoose.model("Order", orderSchema);
