import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ArtworksService } from './artworks.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';

@Controller('artworks')
export class ArtworksController{
    constructor(private artworksService: ArtworksService) {}

    @Get()
    findAll() {
        return this.artworksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string){
        return this.artworksService.findOne(id);
    }

    @Post()
    create(@Body() artwork: CreateArtworkDto){
        console.log(artwork);
        return this.artworksService.create(artwork);
    }

    @Put(':id')
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() artwork: UpdateArtworkDto){
        console.log(artwork);
        return this.artworksService.update(id, artwork);
    }

    @Delete(':id')
    delete(@Param('id', ParseObjectIdPipe) id: string){
        return this.artworksService.delete(id);
    }
}