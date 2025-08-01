import { Module } from '@nestjs/common';
import { SupabaseModule } from './config/supabase/supabase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SupabaseModule, AuthModule],
})
export class AppModule {}
