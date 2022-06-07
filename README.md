# Проект: Место

### Обзор

* Интро
* Дизайн и вёрстка
* Интерактивность
* Картинки
* Методология
* Инструменты

**Интро**

Сайт представлен по ссылке https://kostinpract.github.io/mesto/

**Дизайн и вёрстка**

Верстка делалась по [макету в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1). Вёрстка адаптивная с двумя дополнительными брекпоинтами.

**Интерактивность**

С помощью css transition и псевдоклассов добавлены эффекты при наведении на активные элементы. С помощью javascript добавлена форма редактирования имени и статуса. Для оживления формы использованы элементы DOM и отслеживание событий.

**Картинки**

Картинки взяты из Фигмы и с сайта [unsplash.com](https://unsplash.com/). Вёрстка выполнена таким образом, чтобы в галерею можно было добавлять картинки любого формата: вертикальные, горизонтальные, квадратные.

**Методология**

Классы названы по методлогии БЭМ. Файловая структура для стилей организована в соответствии с nested стандартом.

**Инструменты**

* Редактор VS Code с великолепным Emmet в составе
* Бразуер Chrome c расширением [PerfectPixel by WellDoneCode](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi)
* Бразуер Firefox с расширением [Pixel Perfect Pro](https://addons.mozilla.org/ru/firefox/addon/pixel-perfect-pro/)
* Figma
* Оптимизация картинок https://tinypng.com/
* Валидатор HTML https://validator.w3.org/#validate-by-input
* Валидатор БЭМ https://yoksel.github.io/html-tree/
* Пытался использовать https://github.com/tadatuta/bem-tools-create-by-css для генерации файлов по nested БЭМ, но данный пакет не подключает стили в index.css, а также начал сыпать ошибками, когда в стилях появились медиа-запросы, поэтому в итоге делал снова руками
