import { AppDataSource } from "../db/data-source";
import { User } from "../db/entities/User";
import { DB_ENCRYPTION_KEY } from "../tools/Constants";
import { encrypt, decrypt } from "./EncryptionService"
import crypto from "crypto";

const userRepository = AppDataSource.getRepository(User);

export const getUserByIdAndSecret = async (id: string, clientSecret: string): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    console.log("User not found", { cause: { id, clientSecret } });
    return null;
  }

  if(user.clientSecret !== clientSecret) {
    console.log("Client secret does not match", { cause: { id, clientSecret } });
    return null;
  }

  return user;
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

export const upsertUser = async (user: User | Required<Omit<User, 'id' | 'clientSecret'>>): Promise<User> => {
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
    (user as User).clientSecret = crypto.randomBytes(32).toString("hex");
    return await userRepository.save(user);
  }
}

