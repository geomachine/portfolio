import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true, trim: true },
    category: { type: String, required: true, default: 'Web development' },
    img:      { type: String, default: '' },
    link:     { type: String, default: '' },
    desc:     { type: String, default: '' },
    order:    { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ order: 1, createdAt: -1 });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
