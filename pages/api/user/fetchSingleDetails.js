import User from "@/models/User"
import connectDB from "@/middleware/connectDB"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let { id } = req.body;
            let userData = await User.findById(id);
            res.status(200).send({ success: true, message: "Successfully Retrieved Data !!", data: userData })
        } catch (error) {
            res.status(500).send({success:false, message:error.message})
        }
    }
    res.status(400).send({success:false, message:"Wrong method!"})

}

export default connectDB(handler)