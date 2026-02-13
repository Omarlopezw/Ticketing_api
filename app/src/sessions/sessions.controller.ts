import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SessionService } from "./sessions.service";
import { LoginDto } from "./dto/login.dto";
import { AccessTokenGuard } from "../common/guards/access-token.guard";

@Controller('session')
export class SessionsController {
  constructor(private readonly sessionService: SessionService) {

  }
  @Post('logIn')
  logIn(@Body() loginDto: LoginDto) {
    return this.sessionService.login(loginDto);
  }
}
