import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/messages.schema';
import { MailsModule } from '../mails/mails.module';

@Module({
  imports: [
    AuthModule,
    MailsModule,
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}])
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
