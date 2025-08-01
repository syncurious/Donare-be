import { Module } from '@nestjs/common';
import { SupabaseModule } from './config/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
})
export class AppModule {}
