import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { ArtworksService } from './artworks.service';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

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
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    create(@Body() artwork: CreateArtworkDto){
        console.log(artwork);
        return this.artworksService.create(artwork);
    }

    @Put(':id')
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    update(@Param('id', ParseObjectIdPipe) id: string, @Body() artwork: UpdateArtworkDto){
        console.log(artwork);
        return this.artworksService.update(id, artwork);
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(AuthGuard, RoleGuard)
    delete(@Param('id', ParseObjectIdPipe) id: string){
        return this.artworksService.delete(id);
    }
}