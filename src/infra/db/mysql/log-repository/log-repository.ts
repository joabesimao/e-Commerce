import { LogErrorRepository } from "../../../../data/protocols/db/log/log-error-repository";
import { prisma } from "../helper/index";

export class LogRepository implements LogErrorRepository {
  async log(stack: string): Promise<void> {
    await prisma.errors.create({
      stack,
      date: new Date(),
    });
  }
}
