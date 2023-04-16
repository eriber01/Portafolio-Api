import { AppDataSource } from "../../config/typeorm";
import { Experiences } from "../../entity/Experiences";
import { User } from "../../entity/User";

import {
  APP_SECRET,
  createToken,
  validateExpireToken,
} from "../../config/auth";
import { hash, compare } from "bcryptjs";

module.exports = {
  Query: {
    getUser: async () => {
      const repo = AppDataSource.getRepository(User);

      const user = await repo.find();

      console.log("user: ", user);

      return user;
    },
    getExperiences: async () => {
      const repo = AppDataSource.getRepository(Experiences);

      const experiences = await repo.find();

      console.log(experiences);

      return experiences;
    },
    validateToken: async (_: any, { data }: { data: { token: string } }) => {
      console.log('entro a la funcion', data);
      
      if (!data.token) {
        return { isLogin: false };
      }

      const validate = await validateExpireToken(data.token);
      return { isLogin: validate };
    },
  },
  Mutation: {
    createUpdateUser: async (_: any, { data }: any) => {
      await AppDataSource.transaction(async (txn) => {
        console.log("data: ", data);

        await txn.save(txn.create(User, data));
      });
      return true;
    },
    createdUpdateExperiences: async (_: any, { data }: any) => {
      await AppDataSource.transaction(async (txn) => {
        await txn.save(txn.create(Experiences, data));
      });
    },
    signup: async (
      _: any,
      { data }: { data: { id: number; userName: string; password: string } }
    ) => {
      const repo = AppDataSource.getRepository(User);
      const user = await repo.findOne({ where: { id: data.id } });

      if (!user?.password && !user?.userName) {
        const password = await hash(data.password, 10);
        await repo.update(
          { id: user?.id },
          { password, userName: data.userName }
        );
      }

      const val = await compare(data.password, user?.password || "");

      if (val && user?.userName === data.userName) {
        const token = createToken(user?.id || 0, data?.userName);
        return { token, message: "Login Success", isLogin: true };
      }

      return {
        message: "You are not Eriber, How are you?",
        isLogin: false,
        token: "",
      };
    },
  },
};
