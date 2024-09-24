import * as jwtDecode from 'jwt-decode';
import { Key, ReactNode } from 'react';
// Review için TypeScript arayüzü
export interface Review {
    description: ReactNode;
    id: Key | null | undefined;
    _id: string;
    user: {
      _id: string;
      name: string;
    };
    product: number;
    rating: number;
    comment?: string;
    productNo: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface ReviewDatabase {
    rating: number | undefined;
    id: number;
    userId: number;
    description: string;
    productId: number;
    createdAt: string;
    updatedAt: string;
  }
 

  export interface CustomJwtPayload extends jwtDecode.JwtPayload {

    UserId: string|number|undefined|null;
    userId?: number; // veya string, token'daki türüne göre
  }
  
  
  // CommentProps arayüzü, Comment bileşeni için kullanılacak
  export interface CommentProps {
    name: string;
    comment: string;
    rating: number;
    date: string;
  }
 