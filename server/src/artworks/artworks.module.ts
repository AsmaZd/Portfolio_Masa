import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Artwork, ArtworkSchema } from './schemas/artwork.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Artwork.name, schema: ArtworkSchema }]),
    ],
    controllers: [ArtworksController],
    providers: [ArtworksService],
})
export class ArtworkModule {}