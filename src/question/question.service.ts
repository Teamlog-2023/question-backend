import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createQuestion } from './dto/create-question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly question: Repository<Question>,
  ) {}

  async create({ id, question }: createQuestion) {
    return await this.question.save({
      id,
      question,
    });
  }

  async answer({ uuid }: { uuid: string }, { answer }: { answer: string }) {
    return await this.question.update({ uuid }, { answer });
  }
}
