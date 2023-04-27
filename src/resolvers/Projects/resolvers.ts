import { AppDataSource } from "../../config/typeorm";
import { Projects } from "../../entity/Projects";
import { ProjectsTechnologies } from "../../entity/ProjectsTechnologies";
import { imageManage, manageActionsImage } from "../../utils/imageManage";
import { saveLocalFile } from "../../utils/saveLocalFile";
import { GET_PROJECTS, GET_TECH_PROJECTS } from "./queries";

module.exports = {
  Query: {
    getProjects: async (_: any, { where }: any) => {
      const repo = AppDataSource.getRepository(Projects);

      const projects = await repo.find({
        where,
        order: {
          name: "ASC",
        },
      });

      const projectsArr = await Promise.all(
        projects.map(async (item: any) => {
          return {
            ...item,
            techData: await AppDataSource.query(GET_TECH_PROJECTS, [item.id]),
          };
        })
      );

      return projectsArr;
    },
  },
  Mutation: {
    createdUpdateProject: async (_: any, { data }: any) => {
      await AppDataSource.transaction(async (txn) => {
        console.log("data: ", data);

        const file = await saveLocalFile(data, __dirname);

        const imgRes = await manageActionsImage(
          data,
          "ProjectImage",
          file.filePath
        );

        if (imgRes.validate) {
          data.img = imgRes?.img;
          data.publicId = imgRes?.publicId;
        }

        const res = await txn.save(txn.create(Projects, data));

        console.log(res);

        const repo = AppDataSource.getRepository(ProjectsTechnologies);

        await repo.delete({ projectId: res.id });

        const dataTech = data.techId.map((item: any) => {
          return {
            // id: item.id,
            projectId: res.id,
            techId: item.id,
          };
        });

        await txn.save(txn.create(ProjectsTechnologies, dataTech));

        return res;
      });

      return true;
    },
    deleteProject: async (_: any, { where }: any) => {
      await AppDataSource.transaction(async (txn) => {
        const project = await txn.findOne(Projects, {
          where: {
            id: where.id,
          },
        });

        await txn.delete(Projects, { id: where.id });
        await txn.delete(ProjectsTechnologies, { projectId: project?.id });

        await imageManage("", "", "delete", project?.publicId || "");
      });

      return "Project Deleted";
    },
    deleteProjectTech: async (
      _: any,
      { where: { id } }: { where: { id: number } }
    ) => {
      const repo = AppDataSource.getRepository(Projects);
      const data = await repo.findOne({ where: { id: id } });

      if (!data?.id) {
        throw new Error("The tech not Found");
      }

      await imageManage("", "", "delete", data?.publicId || "");

      await repo.delete({ id: data.id });
      return "Tech Deleted";
    },
    enabledProject: async (
      _: any,
      { where: { id } }: { where: { id: number } }
    ) => {
      const repo = AppDataSource.getRepository(Projects);

      const data = await repo.findOne({ where: { id: id } });

      if (!data?.id) {
        throw new Error("The Project not Found");
      }

      await repo.update({ id: data.id }, { enabled: !data.enabled });
    },
  },
};
