#INCLUDE 'totvs.ch'
#INCLUDE "restful.ch"

User Function testaclasse()
	local i

	_cfil		:= "01"
	aTables 	:= {"SF1"}
	_cModulo	:= "FAT"

	RpcClearEnv()
	RpcSetType(3)
	RpcSetEnv( "99", _cfil, , ,_cModulo,ProcName(),aTables )

	//testando parametros nomeados chamada via rotinas em advpl não são suportados. somente chamadas via rotinas em tlpp

	//testando a classe
    oEmpresas   := nGab.cRotinaEmpresa():New()
    oEmpresas   := oEmpresas:GETConsultaRotinaEmpresa('FSTARTINOVA' ,.t.) //GETConsultaRotinaEmpresa(cRotina as Character,lFullEmp as Logical,cEmpresa as Character,cAtivo as Character)

	//testando api	
	//	oApiEmpresas := nApiGab.cApiRotinaEmpresa():New()
	//	oApiEmpresas := oApiEmpresas:GETConsultaRotinaEmpresa(' fstartinova ' ,.t.) //testando parametros nomeados ; testando heranca da classe

	if valtype(oEmpresas) == 'J'
		if len(oEmpresas["empresas"]) > 0
			//oEmpresas["empresas"][1]:HasProperty("codigoReduzido")
			//oEmpresas["empresas"][1]:HasProperty("codigo")
			//oEmpresas["empresas"][1]:HasProperty("sigla")	
			//oEmpresas["empresas"][1]:HasProperty("descricao")	
			//oEmpresas["empresas"][1]:HasProperty("cnpj")
			//aPropri := oEmpresas["empresas"][1]:GetNames()
			//codigoReduzido := oEmpresas["empresas"][1]:GetJsonText("codigoReduzido")
			teste := ""
			for i:= 1 to len(oEmpresas["empresas"])
				teste +=  oEmpresas["empresas"][i]:GetJsonText("codigoReduzido") + ";"
			next
		endif  
	endif
	FREEOBJ( oEmpresas )
return 
