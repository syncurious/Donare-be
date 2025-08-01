import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase/supabase.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly supabase: SupabaseService) {}
    async signup(signupDto: SignupDto){
        const { data: authData, error: authError } = await this.supabase.getClient().auth.signUp({
            email: signupDto.email,
            password: signupDto.password,
            options: {
                data: {
                    fullName: signupDto.fullName,
                    city: signupDto.city,
                    role: signupDto.role,
                },
            },
        });
        if (authError || !authData.user) throw new Error(authError?.message || 'User not created');
        const { data: userData, error: userError } = await this.supabase.getClient().from('users').insert({
            id: authData.user?.id,
            email: signupDto.email,
            password: signupDto.password,
            fullName: signupDto.fullName,
            city: signupDto.city,
            role: signupDto.role,
        });
        if (userError) throw new Error(userError.message);
        return {
            authData,
            userData,
        };
    }

}
