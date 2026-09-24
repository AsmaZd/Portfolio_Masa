import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtworkModule } from './artworks/artworks.module';
import { ConfigSet } from 'ts-jest';
import { UserModule } from './users/users.module';
<<<<<<< HEAD
import { SocialsModule } from './socials/socials.module';
=======
import { AuthModule } from './auth/auth.module';
>>>>>>> dev

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'), 
        dbName: "portfolio-db"
      })     
    }),
    ArtworkModule,
    UserModule,
<<<<<<< HEAD
    SocialsModule],
=======
    AuthModule],
>>>>>>> dev
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
