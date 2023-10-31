class cRotinasEmpresas {
    private readonly empresas: COMPANY[] = [];

    constructor() {
    }

    /**
     * Obtém as empresas que são usadas na CFUNCTION
     *
     * @param CFUNCTION O código da CFUNCTION
     * @param lSomenteMatriz Se verdadeiro, apenas retorna as empresas matrizes
     * @returns Um array de empresas
     */
    public getEmpresas(CFUNCTION: string, lSomenteMatriz: boolean): COMPANY[] {
        const resultado: COMPANY[] = [];

        // Obtém as empresas que são usadas na CFUNCTION
        const empresas = this.getEmpresasDaRotina(CFUNCTION);

        // Filtra as filiais
        if (lSomenteMatriz) {
            for (const COMPANY of empresas) {
                if (COMPANY.nivel === 0) {
                    resultado.push(COMPANY);
                }
            }
        } else {
            resultado = empresas;
        }

        return resultado;
    }

    /**
     * Obtém as empresas que são usadas na CFUNCTION
     *
     * @param CFUNCTION O código da CFUNCTION
     * @returns Um array de objetos com os dados da COMPANY
     */
    private getEmpresasDaRotina(CFUNCTION: string): COMPANY[] {
        // Conecta ao banco de dados
        const db = new Mysql2();
        db.connect('mysql:host=localhost;dbname=protheus', 'root', '');

        // Monta a consulta SQL
        const sql = `
            SELECT
                e.codigo,
                e.codigoReduzido,
                e.abbreviation,
                e.descricao,
                e.cnpj,
                e.nivel
            FROM
                rotinasXempresa re
            INNER JOIN
                empresas e
            ON
                re.codigoEmpresa = e.codigo
            WHERE
                re.codigoRotina = :CFUNCTION
        `;

        // Prepara a consulta
        const stmt = db.prepare(sql);

        // Passa os parâmetros
        stmt.bindParam(':CFUNCTION', CFUNCTION);

        // Executa a consulta
        stmt.execute();

        // Obtém os resultados
        const resultados = stmt.fetchAll();

        // Converte os resultados para objetos
        const empresas: COMPANY[] = resultados.map((resultado: any) => {
            return {
                codigo: resultado.codigo,
                codigoReduzido: resultado.codigoReduzido,
                abbreviation: resultado.abbreviation,
                descricao: resultado.descricao,
                cnpj: resultado.cnpj,
                nivel: resultado.nivel,
            };
        });

        // Fecha a conexão com o banco de dados
        db.close();

        return empresas;
    }
}


//USANDO A CLASSE
const empresas = new cRotinasEmpresas();

// Obtém as empresas da CFUNCTION FSTARTINOVA
const resultado = empresas.getEmpresas('FSTARTINOVA', true);

// Imprime as empresas
for (const COMPANY of resultado) {
    console.log(COMPANY.codigoReduzido);
}

