import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtworksService } from './artworks.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';

@Controller('artworks')
export class ArtworksController{
    constructor(private artworksService: ArtworksService) {}

    @Get()
    findAll() {
        return this.artworksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.artworksService.findOne(id);
    }

    @Post()
    create(@Body() artwork: CreateArtworkDto){
        console.log(artwork);
        return this.artworksService.create(artwork);
    }
}