import prisma from "../../src/database";
import { UserInput } from "../../src/repository";
import { faker } from "@faker-js/faker"

export async function buildUser(email: string, password?: string) {
  const userData: UserInput = {
    email,
    password: password || new Date().getTime().toString()
  };

  const user = await prisma.user.create({ data: userData });
  return user;
}

export async function buildUserFaker() {
  const email = faker.internet.email() ;
  const password = faker.internet.password() ;
  return  buildUser(email, password)
}