-- Add foto_base64 column to perfis table for profile photo storage
ALTER TABLE perfis ADD COLUMN IF NOT EXISTS foto_base64 TEXT;

-- Add comment explaining the column
COMMENT ON COLUMN perfis.foto_base64 IS 'Base64 encoded profile photo (max 500KB)';
