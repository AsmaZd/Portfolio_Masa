import { Module } from '@nestjs/common';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Social, SocialSchema } from './schemas/social.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Social.name, schema: SocialSchema}])
  ],
  controllers: [SocialsController],
  providers: [SocialsService]
})
export class SocialsModule {}
