@echo off
echo ========================================
echo ARQV30 Enhanced - Instalacao Backend
echo ========================================
echo.

echo [1/5] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Python nao encontrado! Instale Python 3.8+ primeiro.
    echo Download: https://python.org/downloads/
    echo IMPORTANTE: Marque "Add Python to PATH" durante a instalacao!
    pause
    exit /b 1
)
python --version

echo.
echo [2/5] Removendo ambiente virtual anterior (se existir)...
if exist "venv" (
    rmdir /s /q venv
    echo Ambiente virtual anterior removido.
)

echo.
echo [3/5] Criando novo ambiente virtual...
python -m venv venv
if %errorlevel% neq 0 (
    echo ERRO: Falha ao criar ambiente virtual!
    echo Verifique se o Python esta instalado corretamente.
    pause
    exit /b 1
)

echo.
echo [4/5] Ativando ambiente virtual...
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo ERRO: Falha ao ativar ambiente virtual!
    pause
    exit /b 1
)

echo.
echo [5/5] Instalando dependencias...
echo Atualizando pip...
python -m pip install --upgrade pip
echo.
echo Instalando bibliotecas necessarias...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias!
    echo Verifique sua conexao com a internet.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ BACKEND INSTALADO COM SUCESSO!
echo ========================================
echo.
echo Dependencias instaladas:
echo - Flask (servidor web)
echo - Flask-CORS (comunicacao frontend/backend)
echo - Flask-SQLAlchemy (banco de dados)
echo - OpenAI (integracao IA)
echo - E outras bibliotecas necessarias
echo.
echo Para executar o backend, use: run_backend.bat
echo.
pause

