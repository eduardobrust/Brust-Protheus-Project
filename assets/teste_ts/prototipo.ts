class cRotinasEmpresas {
    private readonly empresas: Empresa[] = [];

    constructor() {
    }

    /**
     * Obtém as empresas que são usadas na rotina
     *
     * @param rotina O código da rotina
     * @param lSomenteMatriz Se verdadeiro, apenas retorna as empresas matrizes
     * @returns Um array de empresas
     */
    public getEmpresas(rotina: string, lSomenteMatriz: boolean): Empresa[] {
        const resultado: Empresa[] = [];

        // Obtém as empresas que são usadas na rotina
        const empresas = this.getEmpresasDaRotina(rotina);

        // Filtra as filiais
        if (lSomenteMatriz) {
            for (const empresa of empresas) {
                if (empresa.nivel === 0) {
                    resultado.push(empresa);
                }
            }
        } else {
            resultado = empresas;
        }

        return resultado;
    }

    /**
     * Obtém as empresas que são usadas na rotina
     *
     * @param rotina O código da rotina
     * @returns Um array de objetos com os dados da empresa
     */
    private getEmpresasDaRotina(rotina: string): Empresa[] {
        // Conecta ao banco de dados
        const db = new Mysql2();
        db.connect('mysql:host=localhost;dbname=protheus', 'root', '');

        // Monta a consulta SQL
        const sql = `
            SELECT
                e.codigo,
                e.codigoReduzido,
                e.sigla,
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
                re.codigoRotina = :rotina
        `;

        // Prepara a consulta
        const stmt = db.prepare(sql);

        // Passa os parâmetros
        stmt.bindParam(':rotina', rotina);

        // Executa a consulta
        stmt.execute();

        // Obtém os resultados
        const resultados = stmt.fetchAll();

        // Converte os resultados para objetos
        const empresas: Empresa[] = resultados.map((resultado: any) => {
            return {
                codigo: resultado.codigo,
                codigoReduzido: resultado.codigoReduzido,
                sigla: resultado.sigla,
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

// Obtém as empresas da rotina FSTARTINOVA
const resultado = empresas.getEmpresas('FSTARTINOVA', true);

// Imprime as empresas
for (const empresa of resultado) {
    console.log(empresa.codigoReduzido);
}

