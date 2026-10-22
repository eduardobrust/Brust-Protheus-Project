#include 'protheus.ch'

User Function testeToken()
    Local oScheduleAuto := totvs.framework.schedule.automatic():new() // [5]
    Local cToken        := "SEU_TOKEN_AQUI"
    Local cEnv          := GetEnvServer() // Pega o ambiente atual [6]
    Local cUserAdmin    := "000000" // Código do usuário que executará a tarefa [7, 8]
    Local aCompBranch   := {{"99", {"01"}}} // Estrutura: {{Empresa, {Filiais}}} [7]

    // 1. Define a Rotina que será agendada (deve ter SchedDef) [5]
    If !oScheduleAuto:setRoutine("U_testeToken")
        ConOut("Erro: Rotina inválida para agendamento.")
        Return .F.
    EndIf

    // 2. Configura Identidade e Local de Execução
    oScheduleAuto:setUser(cUserAdmin) // [9]
    oScheduleAuto:setModule(99) // Ex: 99 para Configurador [7, 10]
    oScheduleAuto:setDescription("Agendamento Automático de Processamento de Token") // [9]
    oScheduleAuto:setEnvironment(cEnv, aCompBranch) // [7]

    // 3. Configura Data e Hora da Primeira Execução (agora) [5, 11]
    oScheduleAuto:setFirstExecution(Date(), Time())

    // 4. Configura Periodicidade (Ex: "U" para Única ou "D" para Diária) [11, 12]
    // Se for Diária ("D"), pode-se definir hora e minuto (ex: 12:00)
    oScheduleAuto:setPeriod("U") 
    oScheduleAuto:setRecurrence(.F.) // .T. para repetir conforme frequência [13]

    // 5. Formato PARAMDEF: [14] Ordem, [15] Valor "DE", [16] Valor "ATE"
    // Importante: No formato PARAMDEF não é permitido o uso de fórmulas [4, 17, 18].
    oScheduleAuto:setParams({1, cToken, cToken}) 

    // 6. Dispara a criação do agendamento na tabela XX1 [19]
    If oScheduleAuto:createSchedule()
        ConOut("Sucesso: Agendamento criado com sucesso!")
    Else
        // Em caso de falha, recupera a mensagem de erro [3, 20]
        ConOut("Falha na criação: " + oScheduleAuto:getErrorMessage())
    EndIf

Return

Static Function SchedDef()
    Local aReturn := {}

    // [3] Tipo: "P" (Processo) ou "R" (Relatório)
    // [4] Pergunte: Vazio "" (Indica que não usaremos SX1)
    // [5] Alias: ""
    // [6] Array de Ordem: {}
    // [7] Título da Rotina
    aReturn := { "P", "", "", {}, "Processamento de Token via Paramdef" }
    
Return aReturn
