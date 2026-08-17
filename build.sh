#!/bin/bash
echo "🔨 Сборка SoloDev..."

# Определяем версию
VERSION=$(grep -o 'SoloDev v[0-9.]*' index.html | head -1 | grep -o '[0-9.]*$')
echo "📦 Версия: $VERSION"

# Обфускация через uglify-js
echo "🔒 Обфускация кода..."
uglifyjs app.js -o app.min.js -c -m --comments "/Copyright|License|Dmitriy719/"

# Проверяем результат
if [ ! -f app.min.js ]; then
    echo "❌ Ошибка: app.min.js не создан"
    exit 1
fi

ORIGINAL=$(wc -c < app.js)
MINIFIED=$(wc -c < app.min.js)
SAVINGS=$(( (ORIGINAL - MINIFIED) * 100 / ORIGINAL ))
echo "✅ app.min.js создан: $MINIFIED байт (сжатие: $SAVINGS%)"

# Проверяем синтаксис
echo "🔍 Проверка синтаксиса..."
node --check app.min.js 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Ошибка синтаксиса в app.min.js"
    exit 1
fi
echo "✅ Синтаксис OK"

# Обновляем index.html
if grep -q '<script src="app.js"></script>' index.html; then
    sed -i 's|<script src="app.js"></script>|<script src="app.min.js"></script>|' index.html
    echo "✅ index.html обновлён"
fi

# Коммит
echo "📤 Деплой..."
git add app.min.js index.html LICENSE
git commit -m "v$VERSION: build with obfuscation + license"
git push origin main

echo ""
echo "✅ Деплой завершён!"
echo "🌐 https://dmitriy719.github.io/solodev/?nocache=$(date +%s)"
