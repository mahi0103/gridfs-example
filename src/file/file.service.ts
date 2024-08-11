import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as multerGridFsStorage from 'multer-gridfs-storage';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  private bucket: GridFSBucket;

  constructor(@InjectConnection() private readonly connection: Connection) {
    const db = this.connection.getClient().db();
    this.bucket = new GridFSBucket(db, { bucketName: 'uploads' });
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    return new Promise((resolve, reject) => {
      const uploadStream = this.bucket.openUploadStream(file.originalname, {
        contentType: file.mimetype,
      });

      (readableStream as unknown as Readable).pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => resolve(uploadStream.id));
    });
  }

  async getFileById(id: string): Promise<any[]> {
    return this.bucket.find({ _id: new ObjectId(id) }).toArray();
  }

  async downloadFile(id: string, res: Response): Promise<void> {
    const downloadStream = this.bucket.openDownloadStream(new ObjectId(id));
    (downloadStream as unknown as Readable).pipe(res);
  }
}
