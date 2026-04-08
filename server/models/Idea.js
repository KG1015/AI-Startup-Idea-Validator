import mongoose from 'mongoose';

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  analysis: {
    problemSummary: String,
    customerPersona: String,
    marketOverview: String,
    competitors: [String],
    suggestedTechStack: [String],
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'] },
    profitabilityScore: { type: Number, min: 0, max: 100 }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Idea', IdeaSchema);
