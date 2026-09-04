import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArtworksService } from './artworks.service';

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
}