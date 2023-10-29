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

    oEmpresas   := nGab.cRotinasEmpresas():New()
    oEmpresas   := oEmpresas:GETConsultaRotinaEmpresa(" fstarticf ",.T.)

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
