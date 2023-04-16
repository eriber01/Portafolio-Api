import { AppDataSource } from "../../config/typeorm";
import { Technologies } from "../../entity/Technologies";
import { imageManage, manageActionsImage } from "../../utils/imageManage";

import { GraphQLUpload } from "graphql-upload-ts";
import { saveLocalFile } from "../../utils/saveLocalFile";

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    getTech: async (_: any, { where }: any) => {
      const repo = AppDataSource.getRepository(Technologies);
      const data = await repo.find({ where });

      return data;
    },
    getTechUnique: async (
      _: any,
      { where: { id } }: { where: { id: number } }
    ) => {
      const repo = AppDataSource.getRepository(Technologies);
      const data = await repo.findOne({ where: { id } });
      console.log(id);

      if (!data?.id) {
        throw new Error("The tech not Found");
      }

      return data;
    },
  },
  Mutation: {
    createdUpdateTech: async (_: any, { data }: any) => {
      console.log("data: ", data);

      const file = await saveLocalFile(data, __dirname);

      await AppDataSource.transaction(async (txn) => {
        const imgRes = await manageActionsImage(
          data,
          "TechImage",
          file.filePath
        );

        if (imgRes.validate) {
          data.url = imgRes?.img;
          data.publicId = imgRes?.publicId;
        }

        await txn.save(txn.create(Technologies, data));
      });

      return true;
    },
    deleteTech: async (
      _: any,
      { where: { id } }: { where: { id: number } }
    ) => {
      const repo = AppDataSource.getRepository(Technologies);

      const data = await repo.findOne({ where: { id: id } });

      if (!data?.id) {
        throw new Error("The tech not Found");
      }

      await imageManage("", "", "delete", data?.publicId || "");

      await repo.delete({ id: id });

      return "Tech Deleted";
    },
    enabledTech: async (
      _: any,
      { where: { id } }: { where: { id: number } }
    ) => {
      const repo = AppDataSource.getRepository(Technologies);

      const data = await repo.findOne({ where: { id: id } });

      if (!data?.id) {
        throw new Error("The tech not Found");
      }

      await repo.update({ id: data.id }, { enabled: !data.enabled });
    },
  },
};
