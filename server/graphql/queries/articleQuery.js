import uniqid from 'uniqid';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createArticle = async (_, args) => {
  const {
    hashtags, header, subHeader, logo,
  } = await args;
  console.log('Heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  const { createReadStream, filename } = logo;
  console.log('createReadStream', createReadStream);
  console.log('filename', filename);

  //   try {
  //     const photo = await new Promise((resolve, reject) => {
  //       createReadStream().pipe(
  //         cloudinary.uploader.upload_stream((error, result) => {
  //           if (error) {
  //             reject(error);
  //           }

  //           resolve(result);
  //         }),
  //       );
  //     });

  const id = uniqid('id-');
  const createdAt = new Date().toISOString();

  return {
    id,
    header,
    hashtags,
    subHeader,
    // filename,
    createdAt,
    //   path: photo.secure_url,
  };
//   } catch (error) {
//     throw new Error(error);
//   }
};

export const getArticles = async (_, args) => {};
export const uploadFile = async (_, args) => {
  const {
    body, logo, hashtags, header, subHeader,
  } = await args;
  console.log('body', body);
  console.log('logo', logo);
  console.log('hashtags', hashtags);
  console.log('header', header);
  console.log('subHeader', subHeader);
  return { success: 'Done' };
};
