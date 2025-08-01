import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private client: SupabaseClient;
    constructor (){
        let supabaseUrl = process.env.SUPABASE_URL;
        let supabaseKey = process.env.SUPABASE_KEY;
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('SUPABASE_URL or SUPABASE_KEY is not set');
        }
        this.client = createClient(supabaseUrl, supabaseKey);
    }
    getClient(): SupabaseClient {
        return this.client;
    }
}
