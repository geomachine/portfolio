import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true },
    title:      { type: String, required: true },
    bio:        { type: [String], default: [] },
    avatar:     { type: String, default: '' },
    email:      { type: String, default: '' },
    phone:      { type: String, default: '' },
    location:   { type: String, default: '' },
    linkedin:   { type: String, default: '' },
    github:     { type: String, default: '' },
    githubOrg:  { type: String, default: '' },
    services: [
      {
        title: String,
        text:  String,
        icon:  String,
      },
    ],
    techStack: [
      {
        label: String,
        value: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model('About', AboutSchema);
