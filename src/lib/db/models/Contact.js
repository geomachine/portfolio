import mongoose from 'mongoose';

// Stores contact form submissions
const ContactSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email:    { type: String, required: true },
    message:  { type: String, required: true },
    read:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

ContactSchema.index({ createdAt: -1 });

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
