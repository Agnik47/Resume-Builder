const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-schema for contact information
const ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    website: String,
    location: String
});

// Sub-schema for work experience
const ExperienceSchema = new Schema({
    company: String,
    role: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: [String] // Array of strings for bullet points
});

// Sub-schema for education
const EducationSchema = new Schema({
    school: String,
    degree: String,
    major: String,
    graduationYear: Number
});

// Sub-schema for skills
const SkillsSchema = new Schema({
    category: String,
    list: [String] // Array of strings for skill names
});

// Sub-schema for projects
const ProjectSchema = new Schema({
    title: String,
    description: String,
    link: String
});

// Main Resume Schema
const ResumeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    summary: String,
    contact: ContactSchema,
    experience: [ExperienceSchema], // An array of experience documents
    education: [EducationSchema],
    skills: [SkillsSchema],
    projects: [ProjectSchema],
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Resume = mongoose.model('Resume', ResumeSchema);
module.exports = Resume;