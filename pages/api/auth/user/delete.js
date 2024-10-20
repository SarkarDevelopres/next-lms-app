import User from "@/models/User";
import Cart from "@/models/Cart";
import connectDB from "@/middleware/connectDB";

const handler = async (req, res) => {
    await User.findByIdAndDelete(`${req.body}`);
    // await Cart.find
    res.status(200).json({ message: "Successfully deleted Account" });
}

export default connectDB(handler);