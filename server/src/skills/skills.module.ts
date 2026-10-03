import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { AuthModule } from '../auth/auth.module';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema}])
  ],
  controllers: [SkillsController],
  providers: [SkillsService]
})
export class SkillsModule {}
