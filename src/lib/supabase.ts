import { createClient } from '@supabase/supabase-js';

// Proyecto Supabase de Wasabi Holding (kufwpysbkzsiilkmzyka, eu-west-1).
// Antes apuntaba a blgvdjpduwquydcjwrdi pero ese proyecto fue eliminado
// y dejó toda la app de afiliados+facturas+leads sin BD desde tiempo atrás.
// Restaurado y migraciones aplicadas el 2026-05-18.
export const supabase = createClient(
  'https://kufwpysbkzsiilkmzyka.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1ZndweXNia3pzaWlsa216eWthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTM4OTgsImV4cCI6MjA5MDc2OTg5OH0.NUEiiO-1DHpk9Jn1Pnx5GFmbNzvU76XSDI4vKHiF4P0'
);

export interface Lead {
  id?: string;
  nombre: string;
  telefono: string;
  email: string;
  codigo_postal: string;
  cups?: string;
  factura_url?: string;
  status?: 'nuevo' | 'contactado' | 'convertido' | 'rechazado';
  created_at?: string;
  updated_at?: string;
}
