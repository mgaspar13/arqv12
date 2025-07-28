@echo off
echo ========================================
echo ARQV30 Enhanced - Executando Frontend
echo ========================================
echo.

echo [1/4] Verificando se estamos no diretorio correto...
if not exist "package.json" (
    echo ERRO: package.json nao encontrado!
    echo Verifique se esta executando o script no diretorio correto.
    echo Diretorio atual: %CD%
    pause
    exit /b 1
)
echo package.json encontrado ✅

echo.
echo [2/4] Verificando se node_modules existe...
if not exist "node_modules" (
    echo ERRO: node_modules nao encontrado!
    echo Execute install_frontend.bat primeiro.
    echo.
    echo SOLUCOES:
    echo 1. Execute: install_frontend.bat
    echo 2. Aguarde a instalacao completa
    echo 3. Tente novamente
    pause
    exit /b 1
)
echo node_modules encontrado ✅

echo.
echo [3/4] Verificando se as dependencias principais estao instaladas...
if not exist "node_modules\react" (
    echo ERRO: React nao encontrado em node_modules!
    echo As dependencias nao foram instaladas corretamente.
    echo Execute install_frontend.bat novamente.
    pause
    exit /b 1
)
if not exist "node_modules\vite" (
    echo ERRO: Vite nao encontrado em node_modules!
    echo As dependencias nao foram instaladas corretamente.
    echo Execute install_frontend.bat novamente.
    pause
    exit /b 1
)
echo Dependencias principais verificadas ✅

echo.
echo [4/4] Iniciando servidor de desenvolvimento...
echo.
echo 🚀 Frontend rodando em: http://localhost:5173
echo 📱 Interface responsiva disponivel
echo 🎨 Dashboard com infograficos integrados
echo.
echo O navegador sera aberto automaticamente
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

npm run dev

if %errorlevel% neq 0 (
    echo.
    echo ERRO: Falha ao iniciar o servidor!
    echo.
    echo SOLUCOES:
    echo 1. Verifique se a porta 5173 esta livre
    echo 2. Execute install_frontend.bat novamente
    echo 3. Reinicie o computador
    pause
    exit /b 1
)

echo.
echo Servidor parado.
pause

