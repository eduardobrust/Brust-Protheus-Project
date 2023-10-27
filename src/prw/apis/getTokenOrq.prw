
#INCLUDE 'totvs.ch'
#INCLUDE "restful.ch"

User Function GetTokenOrq()

	_cfil		:= "010101"
	aTables 	:= {"SF1"}
	_cModulo	:= "FAT"

	RpcClearEnv()
	RpcSetType(3)
	RpcSetEnv( "00", _cfil, , ,_cModulo,ProcName(),aTables )

    ctoken := U_TOKORQ("carlos.dasilva")
return 
