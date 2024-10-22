import Chapter from "@/models/Chapter";
import connectDB from "@/middleware/connectDB";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { _id, Name, Description } = JSON.parse(req.body);

        console.log(Name);

        // Create the object for fields that should be updated
        let changedFields = {
            Name:Name,            // Add Name only if it's provided
            Description: Description // Add Description only if it's provided
        };

        try {
            // Update the document using changedFields
            let newChapterData = await Chapter.findOneAndUpdate(
                { "_id":_id },
                { "$set":changedFields },  // Use $set to update only the specified fields
                { new: true }             // Return the updated document
            );
            console.log(newChapterData);

            res.status(200).json({ success: true, message: "Successfully Updated Chapter!" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error updating Chapter", error });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
};

export default connectDB(handler);
