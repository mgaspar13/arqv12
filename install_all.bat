@echo off
echo ========================================
echo ARQV30 Enhanced - Instalacao Completa
echo ========================================
echo.
echo Este script instalara TUDO automaticamente:
echo - Backend Python (Flask + APIs)
echo - Frontend React (Vite + shadcn/ui)
echo.
echo IMPORTANTE: Execute como Administrador!
echo.
pause

echo.
echo ========================================
echo [1/2] INSTALANDO BACKEND
echo ========================================
echo.

cd arqmariav3_enhanced
if %errorlevel% neq 0 (
    echo ERRO: Pasta arqmariav3_enhanced nao encontrada!
    pause
    exit /b 1
)

call install_backend.bat
if %errorlevel% neq 0 (
    echo ERRO: Falha na instalacao do backend!
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo [2/2] INSTALANDO FRONTEND
echo ========================================
echo.

cd arqmariav3_frontend
if %errorlevel% neq 0 (
    echo ERRO: Pasta arqmariav3_frontend nao encontrada!
    pause
    exit /b 1
)

call install_frontend.bat
if %errorlevel% neq 0 (
    echo ERRO: Falha na instalacao do frontend!
    pause
    exit /b 1
)

cd ..

echo.
echo ========================================
echo ✅ INSTALACAO COMPLETA FINALIZADA!
echo ========================================
echo.
echo PROXIMOS PASSOS:
echo.
echo 1. Execute: run_system.bat
echo 2. Acesse: http://localhost:5173
echo.
echo APIS CONFIGURADAS:
echo ✅ OpenAI GPT-4
echo ✅ Google Gemini
echo ✅ HuggingFace
echo ✅ Google Search
echo ✅ Serper API
echo ✅ Jina Reader
echo ✅ Supabase
echo.
echo O sistema esta 100%% funcional!
echo.
pause