#include "totvs.ch"

/*/{Protheus.doc} fncCo
Funcao responsavel por chamar a tela PO UI para gerencimento de cadastro Function x Company
@type function
@version 12.1.2310
@author Eduardo Brust
@since 11/13/2023
/*/
User Function fncCo()
	Local aArea := GetArea()
	FWCallApp('po-function-company')

	RestArea(aArea)
Return

Static Function JsToAdvpl(oWebChannel,cType,cContent)
	Local cUrlProt := ""
	Do Case
		// Se a intera��o que recebi for igual a mensagemJavascript
	Case cType $ 'mensagemJavascript'
		// Imprimo a informa��o que recebi para trabalhar
		alert('O que veio do JS: ' + cContent)
		// Se a intera��o que recebi for igual a receberProtheus
	Case cType $ 'receberprotheus'
		cUrlProt := alltrim(GetNewPar("MV_XURLPRO", " "))
		// Envio um comando ADVPL para minha aplica��o Web
		oWebChannel:AdvPLToJS('urlprotheus', cUrlProt)
	End
Return .T.
