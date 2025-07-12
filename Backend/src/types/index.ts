declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface ItemData {
  title: string;
  description: string;
  category: string;
  size: string;
  point: number;
  userid: string;
  condition: string;
}

export {};
