@echo off
echo ========================================
echo ARQV30 Enhanced - Instalacao Frontend
echo ========================================
echo.

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado! Instale Node.js 18+ primeiro.
    echo Download: https://nodejs.org/
    echo IMPORTANTE: Instale a versao LTS recomendada!
    pause
    exit /b 1
)
echo Node.js encontrado:
node --version

echo.
echo [2/5] Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: npm nao encontrado!
    echo Reinstale o Node.js.
    pause
    exit /b 1
)
echo npm encontrado:
npm --version

echo.
echo [3/5] Limpando instalacoes anteriores...
if exist "node_modules" (
    echo Removendo node_modules anterior...
    rmdir /s /q node_modules
    echo node_modules removido.
)
if exist "package-lock.json" (
    echo Removendo package-lock.json...
    del package-lock.json
    echo package-lock.json removido.
)
if exist "pnpm-lock.yaml" (
    echo Removendo pnpm-lock.yaml...
    del pnpm-lock.yaml
    echo pnpm-lock.yaml removido.
)

echo.
echo [4/5] Configurando npm...
npm config set registry https://registry.npmjs.org/
npm cache clean --force

echo.
echo [5/5] Instalando dependencias...
echo Isso pode levar alguns minutos, aguarde...
echo.
npm install --verbose
if %errorlevel% neq 0 (
    echo.
    echo ERRO: Falha ao instalar dependencias!
    echo.
    echo SOLUCOES:
    echo 1. Execute como Administrador
    echo 2. Verifique sua conexao com a internet
    echo 3. Desative antivirus temporariamente
    echo 4. Tente usar: npm install --force
    echo.
    pause
    exit /b 1
)

echo.
echo [Verificacao] Testando se node_modules foi criado...
if not exist "node_modules" (
    echo ERRO: node_modules nao foi criado!
    echo A instalacao falhou silenciosamente.
    pause
    exit /b 1
)

echo node_modules criado com sucesso ✅

echo.
echo ========================================
echo ✅ FRONTEND INSTALADO COM SUCESSO!
echo ========================================
echo.
echo Dependencias instaladas:
echo - React (biblioteca de interface)
echo - Vite (servidor de desenvolvimento)
echo - Tailwind CSS (estilizacao)
echo - shadcn/ui (componentes)
echo - Lucide Icons (icones)
echo - E outras bibliotecas necessarias
echo.
echo Para executar o frontend, use: run_frontend.bat
echo.
pause

