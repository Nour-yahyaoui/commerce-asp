// lib/db.ts
import { neon } from '@neondatabase/serverless';

export const sql = neon('postgresql://neondb_owner:npg_WjonBp7gUN8b@ep-black-bar-a4n4anoz-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require');