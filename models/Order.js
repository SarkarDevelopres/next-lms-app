const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    PaymentDetails:{ type: Object},j
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);