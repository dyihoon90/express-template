import { IExpressRequest, IJwtPayload } from '@dyihoon90/glogging';
import { Response } from 'express';

/**
 * A DWP Authed express request, which will always include information about the authenticated user
 */
export interface IDwpAuthedRequest extends IExpressRequest {
  user: IDwpJwtPayload;
}

export interface IDwpJwtPayload extends IJwtPayload {
  sub: string; // 'jocelyn_ng@tech.gov.sg';
  jti: string; // '90bae12f-45f8-46d0-a508-0b9ea1f23ac2';
  iat: number; // 1603085425;
  exp: number; // 1610861425;
  iss: string; // 'onemobileuserauthws.dwp.gov.sg';
  'appInstanceID.dwp.gov.sg': string; // '3';
  'appID.dwp.gov.sg': string; // 'oma-facade';
  'sessionID.dwp.gov.sg': string; // 'f47f02db-cfa2-449c-8580-aa8b1f014964';
  'userGUID.dwp.gov.sg': string; // '7D6DB54C-A7D1-47BD-A32A-19F0FDD00238';
  'postingGUID.dwp.gov.sg': string; // 'B5DF9EC1-42FA-4BEB-B5CC-0EBD7B5C6E71';
  'singpass_nric.dwp.gov.sg': string; // 'S2805507B';
  'modules.dwp.gov.sg': string; // '...';
}

export type IResponse = Response;
