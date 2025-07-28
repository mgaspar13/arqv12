@echo off
echo ========================================
echo ARQV30 Enhanced - Executando Backend
echo ========================================
echo.

echo [1/4] Verificando ambiente virtual...
if not exist "venv" (
    echo ERRO: Ambiente virtual nao encontrado!
    echo Execute install_backend.bat primeiro.
    pause
    exit /b 1
)

echo [2/4] Verificando arquivo .env...
if not exist ".env" (
    echo AVISO: Arquivo .env nao encontrado!
    echo Algumas funcionalidades podem nao funcionar.
    echo.
)

echo [3/4] Ativando ambiente virtual...
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo ERRO: Falha ao ativar ambiente virtual!
    echo Execute install_backend.bat novamente.
    pause
    exit /b 1
)

echo.
echo [4/4] Iniciando servidor Flask...
echo.
echo 🚀 Backend rodando em: http://localhost:5000
echo 📊 API de analise: http://localhost:5000/api/analyze
echo 🔧 Health check: http://localhost:5000/api/health
echo 🧪 Test APIs: http://localhost:5000/api/test-apis
echo.
echo ⚠️  IMPORTANTE: Mantenha esta janela aberta!
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

python src\main.py

echo.
echo Servidor parado.
pause