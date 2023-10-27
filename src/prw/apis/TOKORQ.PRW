*******************************************************************************
*+---------------------------------------------------------------------------+*
*|FONTE 	  |  TOKORQ | Autor | Criare Consulting				      		 |*
*+------------+--------------------------------------------------------------+*
*|Data		  | 08:07:2020												     |*
*+------------+--------------------------------------------------------------+*
*|Descricao	  | - Serviço para consulta do Token de acordo com o usuario     |*
*|                                               no orquestra                |*
*+------------+--------------------------------------------------------------+*
*|Solicitante |  											                 |*
*+------------+--------------------------------------------------------------+*
*|Arquivos	  |															     |*
*+------------+--------------------------------------------------------------+*
*|				ATUALIZACOES SOFRIDAS DESDE A CONSTRUCAO INICIAL			 |*
*+---------------------------------------------------------------------------+*
*| Programador		 |	Data	   |		Funcao e Descricao				 |*
*|                   |             |              U_TOKORQ                   |*
*+-------------------+-------------+-----------------------------------------+*
*******************************************************************************


User Function TOKORQ(NomeUsu)

	Local aArea 	:= GetArea()
	Local cTokenAdm	:= GetNewPar("MV_XTOKENO","eUphdeXP4mzJbuRBE5IqaolBfKP%2f1nFjiwLMRw6eSMz0cjcWZWcndWjxZWY%2bHl%2bW003RT%2bWVhMbWwz2SlaajhzUaNVoQ%2fJ3BMoYYpuc0tIo%3d")	
	Local cToken	:= ""
	Local cErro		:= ""
	Local c_Usuario	:= Nomeusu
    Local oWsdl 	:= Nil 
	Local aMetodos  := {}
	Local cMetodo1 	:= "Assume01" //Metodo Utilizado
	Local cEnd1		:= SuperGetMv("MV_XWSORQ1",,"http://10.10.0.221:94/webservice/v2.5/authentication.asmx?WSDL") 
	Local cSimul	:= SuperGetMv("MV_XSIMULO",,"0")
	Local cErro		:= ""
	Local cAviso 	:= ""

    if vazio(c_Usuario) .OR. ValType(c_Usuario) = "U"
        Return cTokenAdm
    endif

	oWsdl := TWsdlManager():New()
	oWsdl:bNoCheckPeerCert := .T. // Desabilita o check de CAs
	oWsdl:lEnableOptAttr := .T. //Habilita tags Opcionais
	oWsdl:lUseNSPrefix := .F. // Desabilita Prefixo 

	If oWsdl:lStatus
		Return cTokenAdm
	EndIf

	If  oWsdl:ParseURL( cEnd1 ) == .F.
		Return cTokenAdm
	EndIf

	// lista os serviços que tem no wsdl
	aServico := oWsdl:GetServices()
	If Len(aServico) == 0
        Return cTokenAdm
	Endif

	// Lista as operações definidas. Passo opcional.
	aMetodos := oWsdl:ListOperations()

	if Len( aMetodos ) == 0 .AND. Ascan(aMetodos, { |X| X[1] == cMetodo1}) == 0 
		Return cTokenAdm
	endif

	// Define a operação
	If  oWsdl:SetOperation( aMetodos[Ascan(aMetodos,{|X|X[1] == cMetodo1})][1] )

		If 	!oWsdl:SetFirst( "Token", cTokenAdm )
			Return cTokenAdm
		EndIf

		If 	!oWsdl:SetFirst( "DsUsername", c_Usuario )  
			Return cTokenAdm
		EndIf

		If 	oWsdl:SetFirst( "Simulation", cSimul ) 
			Return cTokenAdm
		EndIf

		//Envia para Ws
		If oWsdl:SendSoapMsg() == .F. 
			Return cTokenAdm
		endif

		cXml := oWsdl:GetSoapResponse() //Retorno no formato XML
		If !EMPTY(cXml)
			oXml := XmlParser(cXml,"",@cErro,@cAviso)
			If ValType(XmlChildEx(oXml:_SOAP_ENVELOPE:_SOAP_BODY:_ASSUME01RESPONSE:_ASSUME01RESULT,"_ERROR")) == "O"
				Return cTokenAdm
			Else
				cToken := oXml:_SOAP_ENVELOPE:_SOAP_BODY:_ASSUME01RESPONSE:_ASSUME01RESULT:_SUCCESS:_RETURNS:TEXT
            ENDIF
        ENDIF
    ENDIF
Return cToken
