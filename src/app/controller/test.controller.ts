import { IExpressRequest } from '@dyihoon90/glogging';
import { Header, SuccessResponse, Get, Route, Tags, Request, OperationId } from 'tsoa';
import { testService } from '../service/test.service';

@Route('leave')
@Tags('leave')
class Controller {
  @Get('config')
  @SuccessResponse('200', 'OK')
  @OperationId('/leave/config')
  public test(@Request() req: IExpressRequest, @Header('dwp_auth_token') token: string): Promise<string> {
    return Promise.resolve(testService());
  }
}

export default new Controller();
