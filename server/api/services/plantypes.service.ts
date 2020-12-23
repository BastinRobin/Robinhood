import { CreateQuery } from 'mongoose';
import Plantypes, { IPlantypes } from './../models/plantypes';
import L from '../../common/logger';
export class PlantypesService {
  async findAll(): Promise<IPlantypes[]> {
    try {
      return await Plantypes.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IPlantypes> {
    try {
      return await Plantypes.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IPlantypes>): Promise<IPlantypes> {
    try {
      return await Plantypes.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IPlantypes>, id: string): Promise<IPlantypes> {
    try {
      return await Plantypes.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IPlantypes> {
    try {
      return await Plantypes.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new PlantypesService();
