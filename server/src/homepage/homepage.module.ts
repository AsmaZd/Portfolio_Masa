import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Homepage, HomepageSchema } from './schemas/homepage.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: Homepage.name, schema: HomepageSchema}])
  ],
  providers: [HomepageService],
  controllers: [HomepageController]
})
export class HomepageModule {}
