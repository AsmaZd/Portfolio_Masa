import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Homepage, HomepageSchema } from './schemas/homepage.schema';
import { AuthModule } from '../auth/auth.module';
import { Artwork, ArtworkSchema } from '../artworks/schemas/artwork.schema';
import { Social, SocialSchema } from '../socials/schemas/social.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {name: Homepage.name, schema: HomepageSchema},
      {name: Artwork.name, schema: ArtworkSchema},
      {name: Social.name, schema: SocialSchema},
    ])
  ],
  providers: [HomepageService],
  controllers: [HomepageController]
})
export class HomepageModule {}
