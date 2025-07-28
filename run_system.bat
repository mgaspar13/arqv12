@echo off
echo ========================================
echo ARQV30 Enhanced - Sistema Completo
echo ========================================
echo.

echo [VERIFICACAO] Confirmando estrutura de pastas...
if not exist "arqmariav3_enhanced" (
    echo ❌ ERRO: Pasta arqmariav3_enhanced nao encontrada!
    echo.
    echo PROBLEMA: Voce nao esta executando este script no diretorio correto.
    echo.
    echo SOLUCAO:
    echo 1. Navegue ate a pasta raiz do projeto
    echo 2. Execute este script na pasta que contem as subpastas
    echo.
    echo Diretorio atual: %CD%
    pause
    exit /b 1
)

if not exist "arqmariav3_frontend" (
    echo ❌ ERRO: Pasta arqmariav3_frontend nao encontrada!
    echo SOLUCAO: Verifique a estrutura de pastas.
    pause
    exit /b 1
)

echo ✅ Estrutura de pastas verificada!
echo.

echo Verificando se as dependencias foram instaladas...

if not exist "arqmariav3_enhanced\venv" (
    echo ❌ ERRO: Backend nao instalado!
    echo Execute install_all.bat primeiro.
    pause
    exit /b 1
)

if not exist "arqmariav3_frontend\node_modules" (
    echo ❌ ERRO: Frontend nao instalado!
    echo Execute install_all.bat primeiro.
    pause
    exit /b 1
)

echo ✅ Dependencias verificadas com sucesso!
echo.

echo Iniciando Backend e Frontend simultaneamente...
echo.

echo [1/3] Iniciando Backend Flask...
start "ARQV30 Backend - NAO FECHE ESTA JANELA" cmd /k "cd /d %~dp0arqmariav3_enhanced && call run_backend.bat"

echo.
echo [2/3] Aguardando 5 segundos para o backend inicializar...
timeout /t 5 /nobreak > nul

echo [3/3] Iniciando Frontend React...
start "ARQV30 Frontend - NAO FECHE ESTA JANELA" cmd /k "cd /d %~dp0arqmariav3_frontend && call run_frontend.bat"

echo.
echo ========================================
echo ✅ SISTEMA INICIADO COM SUCESSO!
echo ========================================
echo.
echo 🚀 Backend Flask: http://localhost:5000
echo 🎨 Frontend React: http://localhost:5173
echo.
echo DUAS JANELAS FORAM ABERTAS:
echo 1. Backend (Flask) - Mantenha aberta
echo 2. Frontend (React) - Mantenha aberta
echo.
echo ⚠️  NAO FECHE AS JANELAS DO TERMINAL!
echo.
echo 🌐 Acesse: http://localhost:5173
echo.
echo Para parar o sistema:
echo - Feche as duas janelas do terminal
echo - Ou pressione Ctrl+C em cada uma
echo.
echo IMPORTANTE: Se houver problemas, consulte:
echo - COMO_USAR_CORRETAMENTE.md
echo - SOLUCAO_PROBLEMAS.md
echo.
echo Pressione qualquer tecla para finalizar este script...
echo (As outras janelas continuarao rodando)
pause

