/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-02-13 16:33:46
 * @LastEditors: liufan
 * @LastEditTime: 2024-02-13 16:34:20
 */
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
