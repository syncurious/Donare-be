import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private client: SupabaseClient;
    
    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;
        
        if (!supabaseUrl) {
            throw new Error('SUPABASE_URL environment variable is not set. Please add it to your .env file.');
        }
        
        if (!supabaseKey) {
            throw new Error('SUPABASE_KEY environment variable is not set. Please add it to your .env file.');
        }
        
        this.client = createClient(supabaseUrl, supabaseKey);
    }
    
    getClient(): SupabaseClient {
        return this.client;
    }
}
