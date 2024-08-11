import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileId = await this.fileService.uploadFile(file);
    const message = 'file is uploaded successfully with id'+ fileId;
    return {message};
  }

  @Get(':id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    return this.fileService.downloadFile(id, res);
  }
}
