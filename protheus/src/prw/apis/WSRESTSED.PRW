#INCLUDE 'totvs.ch'
#INCLUDE "restful.ch"

WSRESTFUL WSRESTSED DESCRIPTION "Consulta cadastro de Natureza financeira no Protheus[SED]"

	WSDATA cToken       AS CHARACTER
	WSDATA cCod         AS CHARACTER OPTIONAL
	WSDATA cDesc        AS CHARACTER OPTIONAL

	WSMETHOD GET    DESCRIPTION "metodo get"    WSSYNTAX "/WSRESTSED?cToken={cToken}&cCod={cCod}&cDesc={cDesc}"

END WSRESTFUL

WSMETHOD GET WSRECEIVE cToken,cCod,cDesc WSSERVICE WSRESTSED
	Local lRet  := .T.
	local cData := ''

	// define o tipo de retorno do método
	::SetContentType("application/json")

	DEFAULT ::cToken := ''
	DEFAULT ::cCod   := ''
	DEFAULT ::cDesc  := ''

	If U_VTOKEN(::cToken) 

		//funcao para buscar a natureza
		cData := fBuscaSED(::cCod,::cDesc)

		cData := EncodeUtf8(cData)
		::SetResponse( cData )
	else

		cData := '{ '
		cData += ' "method" : "GET", '
		cData += ' "cCodRet" : "401", '
		cData += ' "cDescRet" : "Token Incorreto.", '
		cData += ' "items" : [ '
		cData += '] '
		cData += ' }'

		cData := EncodeUtf8(cData)
		::SetResponse( cData )
		//SetRestFault( 401 , "Token Incorreto.",.T. )
	endif

Return lRet

/*/{Protheus.doc} fBuscaSED
Responsavel por buscar a natureza financeira no protheus
@type function
@version 12.1.33
@author Eduardo Brust
@since 20/07/2023
return caracter, retorna um json
/*/
Static Function fBuscaSED(cCod,cDesc)

	Local _cQry 	:= ""
	Local cTrb1
	Local cCabec    := ""
	Local cItens    := ""
	Local cRodape   := ""
	Local cData     := ""

	DEFAULT cCod   := ''
	DEFAULT cDesc  := ''

	IF !EMPTY(cCod) .OR. !EMPTY(cDesc)

		_cQry += " SELECT ED_CODIGO,ED_DESCRIC " 		         +CRLF
		_cQry += " FROM  " + RetSqlName("SED") + " SED " 		 +CRLF
		_cQry += " WHERE SED.D_E_L_E_T_ = ' ' " 				 +CRLF
		_cQry += " AND ED_FILIAL = '" + FWxFilial("SED")  + "'"  +CRLF

		IF !EMPTY(cCod)
			_cQry += " AND ED_CODIGO  = '" + cCod  + "'" 		  +CRLF
		ENDIF

		IF !EMPTY(cDesc)
			_cQry += " AND ED_DESCRIC LIKE '%" + cDesc  + "%'" 		 +CRLF
			_cQry += " AND ROWNUM <= 10"                    		 +CRLF
		ENDIF

		cTrb1 := MpSysOpenQuery(_cQry)

		While (cTrb1)->(!Eof())

			cItens += ' { '
			cItens += ' "cCod" : "' + AllTrim((cTrb1)->ED_CODIGO) + '", '
			cItens += ' "cDesc" : "' + AllTrim((cTrb1)->ED_DESCRIC) + '" '
			cItens += ' },'

			(cTrb1)->(dbSkip())
		End
		
		//FECHO A AREA ABERTA PELA QUERY
		If Select(cTrb1) > 0 .AND. !EMPTY(cTrb1)
			(cTrb1)->(DbCloseArea())
			cTrb1	:= ""
		endif
	ENDIF

	IF !EMPTY(cItens)

		cItens := SUBSTR( cItens, 1, LEN(cItens) -1)

		cCabec := '{ '
		cCabec += ' "method" : "GET", '
		cCabec += ' "cCodRet" : "200", '
		cCabec += ' "cDescRet" : "Natureza Encontrada", '
		cCabec += ' "items" : [ '

		cRodape += '] '
		cRodape += ' }'

		cData := cCabec+cItens+cRodape
	else
		cCabec := '{ '
		cCabec += ' "method" : "GET", '
		cCabec += ' "cCodRet" : "404", '
		cCabec += ' "cDescRet" : "Natureza nao encontrada", '
		cCabec += ' "items" : [ '
		cRodape += '] '
		cRodape += ' }'

		cData := cCabec+cRodape
	endif

Return cData
