import { CreateQuery } from 'mongoose';
import Document, { IDocument } from './../models/document';
import L from '../../common/logger';
export class DocumentService {
  async findAll(): Promise<IDocument[]> {
    try {
      return await Document.find();
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async findById(id: string): Promise<IDocument> {
    try {
      return await Document.findById(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async create(body: CreateQuery<IDocument>): Promise<IDocument> {
    try {
      return await Document.create(body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async update(body: CreateQuery<IDocument>, id: string): Promise<IDocument> {
    try {
      return await Document.findByIdAndUpdate(id, body);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }

  async deleteById(id: string): Promise<IDocument> {
    try {
      return await Document.findByIdAndDelete(id);
    } catch (error) {
      if (error) {
        L.error('Error ', error);
        return error.message;
      }
    }
  }
}

export default new DocumentService();
