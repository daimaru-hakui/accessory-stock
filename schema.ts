export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          category_name: string
          created_at: string
          id: string
          order: number
        }
        Insert: {
          category_name: string
          created_at?: string
          id?: string
          order?: number
        }
        Update: {
          category_name?: string
          created_at?: string
          id?: string
          order?: number
        }
        Relationships: []
      }
      incoming_details: {
        Row: {
          comment: string
          create_user: string
          created_at: string
          id: number
          incoming_date: string
          order_detail_id: number
          price: number
          quantity: number
          stock_place_id: number
        }
        Insert: {
          comment?: string
          create_user: string
          created_at?: string
          id?: number
          incoming_date: string
          order_detail_id: number
          price?: number
          quantity?: number
          stock_place_id: number
        }
        Update: {
          comment?: string
          create_user?: string
          created_at?: string
          id?: number
          incoming_date?: string
          order_detail_id?: number
          price?: number
          quantity?: number
          stock_place_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "incoming_details_create_user_fkey"
            columns: ["create_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_details_order_detail_id_fkey"
            columns: ["order_detail_id"]
            referencedRelation: "order_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incoming_details_stock_place_id_fkey"
            columns: ["stock_place_id"]
            referencedRelation: "stock_places"
            referencedColumns: ["id"]
          }
        ]
      }
      order_details: {
        Row: {
          availability_date: string
          comment: string
          create_user: string
          created_at: string
          id: number
          order_date: string
          order_id: number
          order_quantity: number
          price: number
          product_id: string
          quantity: number
          stock_place_id: number
        }
        Insert: {
          availability_date: string
          comment?: string
          create_user: string
          created_at?: string
          id?: number
          order_date: string
          order_id: number
          order_quantity?: number
          price?: number
          product_id: string
          quantity?: number
          stock_place_id: number
        }
        Update: {
          availability_date?: string
          comment?: string
          create_user?: string
          created_at?: string
          id?: number
          order_date?: string
          order_id?: number
          order_quantity?: number
          price?: number
          product_id?: string
          quantity?: number
          stock_place_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_details_create_user_fkey"
            columns: ["create_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_details_order_id_fkey"
            columns: ["order_id"]
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_details_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_details_stock_place_id_fkey"
            columns: ["stock_place_id"]
            referencedRelation: "stock_places"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          create_user: string
          created_at: string
          id: number
          order_status: string
        }
        Insert: {
          create_user: string
          created_at?: string
          id?: number
          order_status?: string
        }
        Update: {
          create_user?: string
          created_at?: string
          id?: number
          order_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_create_user_fkey"
            columns: ["create_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      outgoing_details: {
        Row: {
          comment: string
          create_user: string
          created_at: string
          id: number
          outgoing_date: string
          product_id: string
          quantity: number
          stock_place_id: number
        }
        Insert: {
          comment?: string
          create_user: string
          created_at?: string
          id?: number
          outgoing_date: string
          product_id: string
          quantity?: number
          stock_place_id: number
        }
        Update: {
          comment?: string
          create_user?: string
          created_at?: string
          id?: number
          outgoing_date?: string
          product_id?: string
          quantity?: number
          stock_place_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "outgoing_details_create_user_fkey"
            columns: ["create_user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_details_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outgoing_details_stock_place_id_fkey"
            columns: ["stock_place_id"]
            referencedRelation: "stock_places"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          category_id: string
          color_name: string
          color_number: string
          comment: string
          created_at: string
          deleted_at: string | null
          id: string
          lot_number: string
          price: number
          product_name: string
          product_number: string
          size: string
          supplier_id: string
          use_type: string
        }
        Insert: {
          category_id: string
          color_name?: string
          color_number?: string
          comment?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          lot_number?: string
          price: number
          product_name?: string
          product_number?: string
          size?: string
          supplier_id: string
          use_type?: string
        }
        Update: {
          category_id?: string
          color_name?: string
          color_number?: string
          comment?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          lot_number?: string
          price?: number
          product_name?: string
          product_number?: string
          size?: string
          supplier_id?: string
          use_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_supplier_id_fkey"
            columns: ["supplier_id"]
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          }
        ]
      }
      skus: {
        Row: {
          created_at: string
          id: string
          product_id: string
          stock: number
          stock_place_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          stock?: number
          stock_place_id: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          stock?: number
          stock_place_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "skus_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skus_stock_place_id_fkey"
            columns: ["stock_place_id"]
            referencedRelation: "stock_places"
            referencedColumns: ["id"]
          }
        ]
      }
      stock_places: {
        Row: {
          created_at: string
          id: number
          stock_place_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          stock_place_name: string
        }
        Update: {
          created_at?: string
          id?: number
          stock_place_name?: string
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          created_at: string
          id: string
          supplier_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          supplier_name?: string
        }
        Update: {
          created_at?: string
          id?: string
          supplier_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
