import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtworkModule } from './artworks/artworks.module';

@Module({
  imports: [ArtworkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
