import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller('api/v1')
export class AppController {
  // constructor(private readonly appService: AppService) {}
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
