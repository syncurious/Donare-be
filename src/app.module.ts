import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './config/supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule, 
    AuthModule, 
    PrismaModule,
  ],
})
export class AppModule {}
