import mongoose, { Schema, Document } from 'mongoose';

export interface IPlantypes extends Document {
  name: 'string';
  is_enabled: 'boolean';
}

const PlantypesSchema: Schema = new Schema({
  name: {
    type: 'String',
    require: true,
  },
  is_enabled: {
    type: 'Boolean',
    require: true,
  },
});

export default mongoose.model<IPlantypes>('Plantypes', PlantypesSchema);
