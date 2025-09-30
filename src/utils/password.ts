import bcrypt from 'bcrypt';

const DEFAULT_ROUNDS = 10;

export async function hashPassword(plain: string, saltRounds: number = DEFAULT_ROUNDS): Promise<string> {
  return bcrypt.hash(plain, saltRounds);
}

export async function comparePassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}


