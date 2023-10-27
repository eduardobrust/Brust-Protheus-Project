SELECT B1_COD,B1_DESC,SB1.* 
FROM SIGAGMS.SB1000 SB1
WHERE D_E_L_E_T_ = ' '
AND B1_FILIAL = ' '
AND B1_MSBLQL = '2';

SELECT B1_GRUPO,B1_TIPO,COUNT(*) 
FROM SIGAGMS.SB1000 SB1
WHERE D_E_L_E_T_ = ' '
AND B1_FILIAL = ' '
AND B1_MSBLQL = '2'
GROUP BY B1_GRUPO,B1_TIPO
ORDER BY 3 DESC;

SELECT B1_COD, B1_DESC, COUNT(*) OVER () AS total_registros
FROM (
  SELECT B1_COD, B1_DESC
  FROM SIGAGMS.SB1000
  WHERE D_E_L_E_T_ = ' '
  AND B1_FILIAL = ' '
  AND B1_MSBLQL = '2'
  ORDER BY B1_COD
)
OFFSET (1 - 1) * 10 ROWS FETCH NEXT 10 ROWS ONLY;
--OFFSET (page - 1) * size ROWS FETCH NEXT size ROWS ONLY;

----------------------------------------------------------------------

SELECT B1_COD, B1_DESC
FROM SIGAGMS.SB1000
  WHERE D_E_L_E_T_ = ' '
  AND B1_FILIAL = ' '
  AND B1_MSBLQL = '2'
ORDER BY B1_COD
OFFSET (2000 - 1) * 10 ROWS FETCH NEXT 10 ROWS ONLY;

-----------------------------------------------------------------------
SELECT B1_COD, B1_DESC, total_registros
FROM (
  SELECT B1_COD, B1_DESC, ROWNUM AS rn, total_registros
  FROM (
    SELECT B1_COD, B1_DESC, COUNT(*) OVER () AS total_registros
    FROM SIGAGMS.SB1000
    WHERE D_E_L_E_T_ = ' '
    AND B1_FILIAL = ' '
    AND B1_MSBLQL = '2'
    ORDER BY B1_COD
  )
)
WHERE rn BETWEEN 1 AND 10;
-----------------------------------------------------------------------------------------------------------------
SELECT ROTINA,EMPRESA,SIGLA,M0_NOMECOM,M0_CGC,ATIVO 
FROM ROTINA_EMPRESA
INNER JOIN SYS_COMPANY
ON D_E_L_E_T_ = ' '
AND M0_CODIGO = '00'
AND SUBSTR(M0_CODFIL,1,6) = EMPRESA;