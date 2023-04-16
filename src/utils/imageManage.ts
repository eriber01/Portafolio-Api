import { v2 as cloudinary } from "cloudinary";
import { CloudinaryConfig } from "../config/config";
import fs from "fs";

//update the image of technologies and projects to cloudinary
export const imageManage = async (
  dir: string,
  path: string,
  key: string,
  id: string
) => {
  console.log("dir: ", dir);
  console.log("path: ", path);
  console.log("public_id: ", id);

  cloudinary.config(CloudinaryConfig);

  // return urlImg.url;

  switch (key) {
    case "update":
      console.log("***********************paso por aqui*********************");

      const urlImg = await cloudinary.uploader.upload(path, {
        folder: `Portafolio/${dir}`,
        use_filename: true,
      });

      fs.unlink(path, (err) => {
        if (err) {
          throw new Error(`Error to delete de Image`);
        }
      });

      console.log(
        "***********************Ya por en este punto*********************"
      );

      return { img: urlImg.url, publicId: urlImg.public_id };

    case "delete":
      console.log(
        "**************entro a borrar de cloudinary*********************"
      );

      cloudinary.uploader.destroy(id);

      console.log("**************ya borro de cloudinary*********************");

      // fs.unlink(path, (err) => {
      //   if (err) {
      //     throw new Error(`Error to delete de Image`);
      //   }
      // });

      return;
    default:
      return;
  }
};

export const manageActionsImage = async (
  data: any,
  dir: string,
  path: string
) => {
  interface Res {
    validate: boolean;
    img?: string;
    publicId?: string;
  }

  let res: Res = {
    validate: false,
    img: "",
    publicId: "",
  };

  if (data.file) {
    console.log("**************hay un archivo aqui*********************: ", data);

    let imgData;
    res.validate = true;

    if (data.id) {
      console.log("**************llego el id de la tech*********************");

      await imageManage(dir, path, "delete", data.publicId);
      imgData = await imageManage(dir, path, "update", "");
    } else {
      imgData = await imageManage(dir, path, "update", "");
    }

    res.img = imgData?.img;
    res.publicId = imgData?.publicId;
  }

  return res;
};
