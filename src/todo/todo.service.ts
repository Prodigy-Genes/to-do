import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(title: string): Promise<Todo> {
    const todo = new Todo();
    todo.title = title;
    return this.todoRepository.save(todo);
  }

  async update(id: number, isCompleted: boolean) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });

    if (todo) {
      todo.isCompleted = isCompleted;
      return this.todoRepository.save(todo);
    }
    return null;
  }

  async delete(id: number) {
    await this.todoRepository.delete(id).then(() => {});
  }
}
