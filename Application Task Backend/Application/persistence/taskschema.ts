import mongoose, { Schema } from 'mongoose';
import { ITaskPersistence } from '../dataschema/ITaskPersistence';

const TaskSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: false
  }
);

export default mongoose.model<ITaskPersistence & mongoose.Document>(
  'Task',
  TaskSchema
);
