declare module "../middlewares/aws.js" {
  const aws: {
    uploadbuffer: { single: (field: string) => any };
    s3UploadObject: (buffer: any, filename: string, mimetype: string) => Promise<any>;
    s3DeleteObject: (url: string) => Promise<any>;
  };
  export default aws;
}


