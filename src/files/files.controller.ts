import {Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {FileElementResponse} from "./dto/file-element.response";

@Controller('files')
export class FilesController {
    @Post('upload')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('files'))
    @UseGuards(JwtAuthGuard)
    async uploadFile(@UploadedFile() file: Express.Multer.File ): Promise<FileElementResponse[]> {

    }
}
