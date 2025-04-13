declare namespace Express {
    export interface Multer {
      File: {
        filename: string;
        originalname: string;
        mimetype: string;
        size: number;
        path: string;
      };
    }
  }
  