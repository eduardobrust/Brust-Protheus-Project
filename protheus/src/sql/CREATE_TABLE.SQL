DECLARE V_COUNT NUMBER;

V_INDEX VARCHAR2(100) := 'IDX';

V_OWNER VARCHAR2(100) := 'SIGAGMS';

V_INDEX_TBS VARCHAR2(100) := 'MSIGMS';

V_TABLE_NAME VARCHAR2(100) := 'FUNCTION_COMPANY';

BEGIN --verifica se a tabela existe, se existir apaga
SELECT
  COUNT(*) INTO V_COUNT
FROM
  DBA_TABLES T
WHERE
  T.OWNER = V_OWNER
  AND T.TABLE_NAME = V_TABLE_NAME;

IF V_COUNT = 1 THEN EXECUTE IMMEDIATE 'DROP TABLE ' || V_OWNER || '.' || V_TABLE_NAME || ' PURGE';

END IF;

--cria a tabela
EXECUTE IMMEDIATE 'CREATE TABLE ' || V_OWNER || '.' || V_TABLE_NAME || 

'(CFUNCTION VARCHAR2(50), 
	COMPANY VARCHAR2(6),
  ABBREVIATION VARCHAR2(10),
  ACTIVE VARCHAR2(1))';

--cria os indices
EXECUTE IMMEDIATE 'CREATE INDEX ' || V_OWNER || '.' || V_INDEX || '_CFUNCTION ON ' || V_OWNER || '.' || V_TABLE_NAME || '(CFUNCTION) TABLESPACE ' || V_INDEX_TBS;

EXECUTE IMMEDIATE 'CREATE INDEX ' || V_OWNER || '.' || V_INDEX || '_COMPANY ON ' || V_OWNER || '.' || V_TABLE_NAME ||'(COMPANY) TABLESPACE ' || V_INDEX_TBS;

EXECUTE IMMEDIATE 'CREATE INDEX ' || V_OWNER || '.' || V_INDEX || '_ATIVO ON ' || V_OWNER || '.' || V_TABLE_NAME || '(ACTIVE) TABLESPACE ' || V_INDEX_TBS;

EXECUTE IMMEDIATE 'ALTER TABLE ' || V_OWNER || '.' || V_TABLE_NAME || '  
  add CONSTRAINT ' || V_INDEX || '_PK primary key (CFUNCTION,COMPANY) USING INDEX TABLESPACE  ' || V_INDEX_TBS;

END;