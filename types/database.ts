export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  rating: number;
  reviews_count: number;
  category: string;
  image_url: string;
  badge: string | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  product_name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
}

export interface Task {
  id: string;
  project_id: string | null;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  created_at: string;
  project?: Project;
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Product>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string;
          status: 'active' | 'completed' | 'archived';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          color?: string;
          status?: 'active' | 'completed' | 'archived';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          color?: string;
          status?: 'active' | 'completed' | 'archived';
          created_at?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          project_id: string | null;
          title: string;
          description: string | null;
          status: 'todo' | 'in_progress' | 'done';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          due_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          title: string;
          description?: string | null;
          status?: 'todo' | 'in_progress' | 'done';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          due_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string | null;
          title?: string;
          description?: string | null;
          status?: 'todo' | 'in_progress' | 'done';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          due_date?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
