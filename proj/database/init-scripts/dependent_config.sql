DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_name = 'orders'
    ) THEN
        PERFORM create_hypertable('orders', 'created_at');
    ELSE
        RAISE NOTICE 'Table "orders" not found, trying again...';
    END IF;
END $$;