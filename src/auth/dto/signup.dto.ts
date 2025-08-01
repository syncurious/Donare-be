import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../enums/role.enum";


export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

}


export class UserPreferencesDto {
  @IsNumber()
  @IsNotEmpty()
  last_zakat_date: number;
  
  @IsBoolean()
  @IsNotEmpty()
  recive_zakat_remainder: boolean;

  @IsBoolean()
  @IsNotEmpty()
  stay_updated_on_new_campaigns: boolean;

}