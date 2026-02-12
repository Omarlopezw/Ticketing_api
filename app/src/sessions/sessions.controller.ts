import { Controller } from "@nestjs/common";
import { SessionService } from "./sessions.service";


@Controller('session')
export class SessionsController {
  constructor(private readonly sessionService: SessionService) {

  }
}