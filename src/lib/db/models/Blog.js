import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true, trim: true },
    image:    { type: String, default: '' },
    excerpt:  { type: String, default: '' },
    content:  { type: String, required: true },
    category: { type: String, default: 'General' },
    tags:     { type: [String], default: [] },
  },
  { timestamps: true }
);

BlogSchema.index({ createdAt: -1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
