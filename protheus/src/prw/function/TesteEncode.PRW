#include "protheus.ch"

User Function testeb4()
	Local cEncode64         := ""
	Local cPath             := "\base64\"
	Local cFile             := "aprovacao_bordero.xlsx"

	_cfil		:= "01"
	aTables 	:= {"SF1"}
	_cModulo	:= "FAT"

	RpcClearEnv()
	RpcSetEnv( "99", _cfil, , ,_cModulo,ProcName(),aTables )

	cEncode64 := Encode64( , cPath + cFile, .F., .F. )

	RpcClearEnv()

Return cEncode64
