const path = require("path");
const { createWriteStream } = require("fs");

export const saveLocalFile = async (data: any, dirname: any) => {
  const { createReadStream, mimetype } = await data.file;

  
  const readableStream = createReadStream();
  const extension = mimetype.split("/")[1];
  const newFileName = `${data.name}.${extension}`;
  const filePath = path.join(dirname, "imgTech", newFileName);
  console.log(filePath);
  
  const writableStream = createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    readableStream
      .pipe(writableStream)
      .on("finish", resolve)
      .on("error", reject);
  });


  return {filePath}
};
