#include "totvs.ch"

/*/{Protheus.doc} fncCo
Funcao responsavel por chamar a tela PO UI para gerencimento de cadastro Function x Company
@type function
@version 12.1.2410
@author Eduardo Brust
@since 03/28/2025
/*/
User Function fncCo()
	Local aArea := GetArea()
	FWCallApp('po-function-company')

	RestArea(aArea)
Return

Static Function JsToAdvpl(oWebChannel,cType,cContent)
	Local cUrlProt := ""
	Do Case
		// Se a interação que recebi for igual a mensagemJavascript
	Case cType $ 'mensagemJavascript'
		// Imprimo a informação que recebi para trabalhar
		alert('O que veio do JS: ' + cContent)
		// Se a interação que recebi for igual a receberProtheus
	Case cType $ 'receberprotheus'
		cUrlProt := alltrim(GetNewPar("MV_XURLPRO", "https://localhost:8003/rest/"))
		// Envio um comando ADVPL para minha aplicação Web
		oWebChannel:AdvPLToJS('urlprotheus', cUrlProt)
	End
Return .T.
