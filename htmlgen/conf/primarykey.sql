postgres
[
	SELECT c.column_name
	FROM information_schema.table_constraints tc
	JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name)
	JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema
	AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
	WHERE constraint_type = 'PRIMARY KEY' and tc.table_name = :table
]

oracle
[
	SELECT cols.column_name
	FROM all_constraints cons, all_cons_columns cols
	WHERE cols.table_name = upper(:table)
	AND cons.constraint_type = 'P'
	AND cons.constraint_name = cols.constraint_name
	AND cons.owner = cols.owner
	ORDER BY cols.position
]
