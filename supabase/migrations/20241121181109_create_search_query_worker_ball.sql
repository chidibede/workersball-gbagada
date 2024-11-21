
CREATE OR REPLACE FUNCTION get_search_results_ball(search_text TEXT)
RETURNS SETOF record
LANGUAGE sql
AS $$
     SELECT 
    p.*,
    COALESCE(wa.code, wi.code) AS finalCode,
    COALESCE(wa.tablenumber, wi.tablenumber) AS table,
    COALESCE(wa.seatnumber, wi.seatnumber) AS seat_number
FROM 
    worker p
LEFT JOIN 
    workertables wa
ON 
    p.id::text = wa.workerid
LEFT JOIN 
    workertablesinactive wi
ON 
    p.id::text = wi.workerid
WHERE 
    p.firstname ILIKE '%' || search_text || '%'
    OR p.lastname ILIKE '%' || search_text || '%'
    OR p.phonenumber ILIKE '%' || search_text || '%'
    OR p.fullname ILIKE '%' || search_text || '%'
    OR p.fullnamereverse ILIKE '%' || search_text || '%'
    OR p.team ILIKE '%' || search_text || '%'
    OR p.department ILIKE '%' || search_text || '%'
    OR p.email ILIKE '%' || search_text || '%';
$$;
