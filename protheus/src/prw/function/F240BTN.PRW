#INCLUDE 'totvs.ch'
User Function F240BTN()
	Local aButtons:= paramixb
	aAdd( aButtons ,{ "OBJETIVO",{|| alert("botão teste")},"Teste"," BR_VERMELHO"})
Return aButtons
