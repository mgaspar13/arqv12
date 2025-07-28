@echo off
echo ========================================
echo ARQV30 Enhanced - Instalacao SIMPLES
echo ========================================
echo.
echo Este e um script SUPER SIMPLES para instalar
echo as dependencias do frontend sem verificacoes complexas.
echo.
echo IMPORTANTE: Execute este script dentro da pasta:
echo arqmariav3_frontend
echo.
echo Pressione qualquer tecla para continuar...
pause

echo.
echo Limpando instalacoes anteriores...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Instalando dependencias...
echo Isso pode demorar alguns minutos...
echo.

npm install

echo.
if exist node_modules (
    echo ========================================
    echo ✅ SUCESSO! node_modules foi criado!
    echo ========================================
    echo.
    echo Agora execute: run_frontend.bat
) else (
    echo ========================================
    echo ❌ FALHOU! node_modules nao foi criado!
    echo ========================================
    echo.
    echo SOLUCOES:
    echo 1. Execute como Administrador
    echo 2. Desative antivirus temporariamente  
    echo 3. Verifique conexao com internet
    echo 4. Execute install_manual_debug.bat para diagnostico
)

echo.
pause

