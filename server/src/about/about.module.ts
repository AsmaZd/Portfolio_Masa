import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { AuthModule } from '../auth/auth.module';
import { About, AboutSchema } from './schemas/about.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: About.name, schema: AboutSchema}])
  ],
  controllers: [AboutController],
  providers: [AboutService]
})
export class AboutModule {}
