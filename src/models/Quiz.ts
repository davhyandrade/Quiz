import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  creator: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  pages: [{
    type: Array,
    require: true,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);