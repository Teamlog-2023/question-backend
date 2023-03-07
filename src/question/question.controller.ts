import { Controller, Get, UseGuards } from '@nestjs/common';
import { Body, Param, Patch, Post, Req } from '@nestjs/common/decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { Repository } from 'typeorm';
import { createQuestion } from './dto/create-question.dto';
import { PatchQuestion } from './dto/patch-question.dto';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    @InjectRepository(Question)
    private readonly question: Repository<Question>,
  ) {}

  @Get()
  async getQuestions() {
    return await this.question.find();
  }

  @Get('club/:id')
  async getClubQuestions(@Param('id') id: number) {
    return await this.question.findBy({ id });
  }

  @Post()
  async createQuestion(@Body() body: createQuestion) {
    return await this.questionService.create(body);
  }

  @Patch(':uuid')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async answerQuestion(
    @Param('uuid') uuid: string,
    @Body() body: PatchQuestion,
  ) {
    return await this.questionService.answer({ uuid }, { answer: body.answer });
  }
}
