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
    oEmpresas   := nGab.cFunctionCompany():New()
    oEmpresas   := oEmpresas:getFunctionCompany('FSTARTINOVA' ,.t.) //getFunctionCompany(cFunction as Character,lAllBranches as Logical,cCompany as Character,cAtivo as Character)

	//testando api	
	//	oApiEmpresas := nApiGab.cApiFunctionCompany():New()
	//	oApiEmpresas := oApiEmpresas:getFunctionCompany(' fstartinova ' ,.t.) //testando parametros nomeados ; testando heranca da classe

	if valtype(oEmpresas) == 'J'
		if len(oEmpresas["companies"]) > 0
			//oEmpresas["companies"][1]:HasProperty("reducedCode")
			//oEmpresas["companies"][1]:HasProperty("company")
			//oEmpresas["companies"][1]:HasProperty("abbreviation")	
			//oEmpresas["companies"][1]:HasProperty("description")	
			//oEmpresas["companies"][1]:HasProperty("cnpj")
			//aPropri := oEmpresas["companies"][1]:GetNames()
			//codigoReduzido := oEmpresas["companies"][1]:GetJsonText("reducedCode")
			teste := ""
			for i:= 1 to len(oEmpresas["companies"])
				teste +=  oEmpresas["companies"][i]:GetJsonText("reducedCode") + ";"
			next
		endif  
	endif
	FREEOBJ( oEmpresas )
return 
