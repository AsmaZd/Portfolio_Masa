import { Module } from '@nestjs/common';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Artwork, ArtworkSchema } from './schemas/artwork.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([{ name: Artwork.name, schema: ArtworkSchema }]),
    ],
    controllers: [ArtworksController],
    providers: [ArtworksService],
})
export class ArtworkModule {}