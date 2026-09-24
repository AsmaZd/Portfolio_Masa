import { Module } from '@nestjs/common';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Social, SocialSchema } from './schemas/social.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Social.name, schema: SocialSchema}])
  ],
  controllers: [SocialsController],
  providers: [SocialsService]
})
export class SocialsModule {}
