import {Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {FileElementResponse} from "./dto/file-element.response";
import {FilesService} from "./files.service";
import {MFile} from "./mfile.class";


@Controller('files')
export class FilesController {

    constructor(private readonly FilesService: FilesService) {
    }

    @Post('upload')
    @HttpCode(200)
    @UseInterceptors(FileInterceptor('files'))
    @UseGuards(JwtAuthGuard)
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
        const saveArray: MFile[] = [new MFile(file)];
        //const saveArray: MFile[] = [file];
        if (file.mimetype.includes('image')) {
            const buffer = await this.FilesService.convertToWebp(file.buffer);
            saveArray.push(new MFile({originalname:`${file.originalname.split('.')[0]}.webp`, buffer }));
        }
        return this.FilesService.saveFiles(saveArray);
    }
}
