import { AppDataSource } from "../db/data-source";
import { User } from "../db/entities/User";
import { DB_ENCRYPTION_KEY } from "../tools/Constants";
import { encrypt, decrypt } from "./EncryptionService"

const userRepository = AppDataSource.getRepository(User);

console.log('DB_ENCRYPTION_KEY:', DB_ENCRYPTION_KEY);
if (DB_ENCRYPTION_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be 32 characters long for AES-256 encryption.');
}else {
  console.log('DB_ENCRYPTION_KEY is valid length:', DB_ENCRYPTION_KEY.length);
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await userRepository.findOneBy({ email });
  if (!user) {
    return null;
  }

  user.accessToken = decrypt(user.accessToken, DB_ENCRYPTION_KEY);
  user.refreshToken = decrypt(user.refreshToken, DB_ENCRYPTION_KEY);

  return user;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    return null;
  }
  user.accessToken = decrypt(user.accessToken, DB_ENCRYPTION_KEY);
  user.refreshToken = decrypt(user.refreshToken, DB_ENCRYPTION_KEY);
  return user;
};


export const upsertUser = async (user: User | Required<Omit<User, 'id'>>): Promise<User> => {
  const existingUser = await getUserByEmail(user.email);

  if (existingUser) {
    existingUser.firstName = user.firstName || existingUser.firstName;
    existingUser.lastName = user.lastName || existingUser.firstName;
    existingUser.accessToken = encrypt(user.accessToken || existingUser.accessToken, DB_ENCRYPTION_KEY);
    existingUser.refreshToken = encrypt(user.refreshToken || existingUser.refreshToken, DB_ENCRYPTION_KEY);
    existingUser.authProvider = user.authProvider || existingUser.authProvider;
    return await userRepository.save(existingUser);
  } else {
    user.accessToken = encrypt(user.accessToken, DB_ENCRYPTION_KEY);
    user.refreshToken = encrypt(user.refreshToken, DB_ENCRYPTION_KEY);
    return await userRepository.save(user);
  }
}

