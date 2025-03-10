export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      crop_predictions: {
        Row: {
          created_at: string
          crop_type: string
          farm_area: number
          id: string
          location: string
          predicted_yield: number | null
          recommendation: string | null
          soil_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crop_type: string
          farm_area: number
          id?: string
          location: string
          predicted_yield?: number | null
          recommendation?: string | null
          soil_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          crop_type?: string
          farm_area?: number
          id?: string
          location?: string
          predicted_yield?: number | null
          recommendation?: string | null
          soil_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      government_schemes: {
        Row: {
          application_process: string
          benefits: string
          category: string
          created_at: string
          description: string
          eligibility: string
          id: string
          name: string
          state: string | null
          updated_at: string
        }
        Insert: {
          application_process: string
          benefits: string
          category: string
          created_at?: string
          description: string
          eligibility: string
          id?: string
          name: string
          state?: string | null
          updated_at?: string
        }
        Update: {
          application_process?: string
          benefits?: string
          category?: string
          created_at?: string
          description?: string
          eligibility?: string
          id?: string
          name?: string
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      scheme_applications: {
        Row: {
          application_date: string
          created_at: string
          farmer_details: Json | null
          id: string
          scheme_name: string
          status: string
          supporting_documents: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_date?: string
          created_at?: string
          farmer_details?: Json | null
          id?: string
          scheme_name: string
          status?: string
          supporting_documents?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_date?: string
          created_at?: string
          farmer_details?: Json | null
          id?: string
          scheme_name?: string
          status?: string
          supporting_documents?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      storage_bookings: {
        Row: {
          created_at: string
          crop_type: string
          end_date: string
          government_scheme_id: string | null
          id: string
          quantity: number
          start_date: string
          status: string
          storage_facility_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crop_type: string
          end_date: string
          government_scheme_id?: string | null
          id?: string
          quantity: number
          start_date: string
          status?: string
          storage_facility_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          crop_type?: string
          end_date?: string
          government_scheme_id?: string | null
          id?: string
          quantity?: number
          start_date?: string
          status?: string
          storage_facility_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "storage_bookings_government_scheme_id_fkey"
            columns: ["government_scheme_id"]
            isOneToOne: false
            referencedRelation: "government_schemes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "storage_bookings_storage_facility_id_fkey"
            columns: ["storage_facility_id"]
            isOneToOne: false
            referencedRelation: "storage_facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      storage_facilities: {
        Row: {
          capacity: number | null
          contact_info: string | null
          created_at: string
          description: string | null
          id: string
          location: string
          name: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location: string
          name: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      transportation_bookings: {
        Row: {
          created_at: string
          crop_type: string
          delivery_location: string
          id: string
          pickup_date: string
          pickup_location: string
          quantity: number
          status: string
          transportation_provider_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crop_type: string
          delivery_location: string
          id?: string
          pickup_date: string
          pickup_location: string
          quantity: number
          status?: string
          transportation_provider_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          crop_type?: string
          delivery_location?: string
          id?: string
          pickup_date?: string
          pickup_location?: string
          quantity?: number
          status?: string
          transportation_provider_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transportation_bookings_transportation_provider_id_fkey"
            columns: ["transportation_provider_id"]
            isOneToOne: false
            referencedRelation: "transportation_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      transportation_providers: {
        Row: {
          capacity: number | null
          contact_info: string
          created_at: string
          id: string
          name: string
          rates: string | null
          service_area: string | null
          updated_at: string
          vehicle_type: string | null
        }
        Insert: {
          capacity?: number | null
          contact_info: string
          created_at?: string
          id?: string
          name: string
          rates?: string | null
          service_area?: string | null
          updated_at?: string
          vehicle_type?: string | null
        }
        Update: {
          capacity?: number | null
          contact_info?: string
          created_at?: string
          id?: string
          name?: string
          rates?: string | null
          service_area?: string | null
          updated_at?: string
          vehicle_type?: string | null
        }
        Relationships: []
      }
      user_crops: {
        Row: {
          created_at: string
          crop_name: string
          description: string | null
          expected_harvest_date: string | null
          id: string
          planting_date: string | null
          quantity: number | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          crop_name: string
          description?: string | null
          expected_harvest_date?: string | null
          id?: string
          planting_date?: string | null
          quantity?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          crop_name?: string
          description?: string | null
          expected_harvest_date?: string | null
          id?: string
          planting_date?: string | null
          quantity?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_crops_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
