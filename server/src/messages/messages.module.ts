import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/messages.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}])
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
