import { Webhook } from 'svix';
import userModel from '../models/userModel.js';

// API CONTROLLER FX TO MANAGE CLERK USER
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created":
        {
          const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email,  // Fixed issue here
            firstName: data.first_name,
            lastName: data.last_name,  // Corrected property name
            photo: data.image_url,
          };
          await userModel.create(userData);
          res.json({ success: true, message: "User created successfully" });
        }
        break;
      case "user.updated":
        {
          const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email,  // Fixed issue here
            firstName: data.first_name,
            lastName: data.last_name,  // Corrected property name
            photo: data.image_url,
          };

          await userModel.findOneAndUpdate({ clerkId: data.id }, userData);  // Fixed query here
          res.json({ success: true, message: "User updated successfully" });
        }
        break;
      case "user.deleted":
        {
          await userModel.findOneAndDelete({ clerkId: data.id });
          res.json({ success: true, message: "User deleted successfully" });
        }
        break;

      default:
        res.status(400).json({ success: false, message: "Unknown event type" });
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks };
