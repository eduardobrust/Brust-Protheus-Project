#INCLUDE 'totvs.ch'
User Function F241BTN()
	Local aBotao := {}

	// Exemplo: Adicionando um botão para chamar a integração customizada
	Aadd(aBotao, { "RESUME", { || u_SuaFuncao() }, "Enviar para Integra", "Envio Agrupado" })

Return aBotao
