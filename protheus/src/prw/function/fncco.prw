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

	ALERT('fncCo-Chamando Rotina PO UI')
    FWCallApp('po-function-company')

	RestArea(aArea)
Return
