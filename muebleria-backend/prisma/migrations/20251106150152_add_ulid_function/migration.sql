-- Activar extensión para generar bytes aleatorios
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Crear función ULID ordenable
CREATE OR REPLACE FUNCTION ulid_generate()
RETURNS CHAR(26) AS $$
DECLARE
    timestamp_ms BIGINT;
    random_bytes BYTEA;
    encoding_table TEXT := '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    ulid_text CHAR(26);
    i INT;
    idx INT;
BEGIN
    timestamp_ms := FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000);
    random_bytes := gen_random_bytes(10);
    ulid_text := '';

    -- 10 caracteres basados en timestamp
    FOR i IN 1..10 LOOP
        idx := (timestamp_ms >> ((10 - i) * 5)) & 31;
        ulid_text := ulid_text || substr(encoding_table, idx + 1, 1);
    END LOOP;

    -- 16 caracteres aleatorios
    FOR i IN 0..9 LOOP
        idx := get_byte(random_bytes, i) >> 3;
        ulid_text := ulid_text || substr(encoding_table, idx + 1, 1);
    END LOOP;

    RETURN ulid_text;
END;
$$ LANGUAGE plpgsql;
