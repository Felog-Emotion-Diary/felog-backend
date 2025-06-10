// declare module 'multer-s3' {
//   import { S3 } from 'aws-sdk';
//   import { StorageEngine } from 'multer';

//   interface Options {
//     s3: S3;
//     bucket: string;
//     acl?: string;
//     key?: (
//       req: Express.Request,
//       file: Express.Multer.File,
//       callback: (error: any, key: string) => void
//     ) => void;
//     contentType?: (
//       req: Express.Request,
//       file: Express.Multer.File,
//       callback: (error: any, mime: string) => void
//     ) => void;
//   }

//   function multerS3(options: Options): StorageEngine;

//   export = multerS3;
// }
