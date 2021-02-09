const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // автопрефиксер
    browserSync = require('browser-sync'), // обновление браузера
    concat = require('gulp-concat'), // объединяет файлы
    cssmin = require('gulp-csso'), // минифицирует CSS
    del = require('del'), // удаляет файлы
    imagemin = require('gulp-imagemin'), // сжимает картинки
    jsmin = require('gulp-terser'), // минифицирует JS
    groupMedia = require('gulp-group-css-media-queries'), // объединяет медиа-файлы
    htmlmin = require('gulp-htmlmin'), // минифицирует HTML
    newer = require('gulp-newer'), // заменяет файлы только на новые
    notify = require('gulp-notify'), // выводит сообщение об ошибке
    plumber = require('gulp-plumber'), // не прекращает работу gulp'a при ошибке
    include = require('gulp-file-include'), // инклюд html
    rename = require('gulp-rename'), // переименовует файлы
    scss = require('gulp-sass'), // конвертиртирует sass в css
    sourcemaps = require('gulp-sourcemaps'), // создаёт source maps
    svgstore = require('gulp-svgstore'), // создаёт спрайт svg
    webp = require('gulp-webp'), //  конвертиртирует PNG, JPEG в WebP
    webphtml = require('gulp-webp-html'); // заменяет в HTML картинки на WebP 

// HTML
const html = () => {
    return gulp.src(['src/*.html', '!src/_*.html'])
        .pipe(include())
        .pipe(webphtml())
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
};

exports.html = html;

// Styles
const styles = () => {
    return gulp.src('src/styles/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            groupMedia()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(gulp.dest('dist/css'))
        .pipe(cssmin())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
};

exports.styles = styles;

// Scripts
const scripts = () => {
    return gulp.src('src/scripts/script.js')
        .pipe(sourcemaps.init())
        .pipe(gulp.dest('dist/js'))
        .pipe(jsmin())
        .pipe(rename("script.min.js"))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
};

exports.scripts = scripts;

// Make file libs.js
const jsLibs = () => {
    return gulp
        .src('src/scripts/libs/*.js')
        .pipe(concat('libs.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
};

exports.jsLibs = jsLibs;


// Images
const images = () => {
    return gulp.src(['src/images/**/*.{png,jpg,svg}', '!src/images/sprite-icons/*.svg'])
        .pipe(newer('dist/images'))
        .pipe(imagemin([
            imagemin.mozjpeg({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false
                }]
            }),
        ]))
        .pipe(gulp.dest('dist/images'))
        .pipe(gulp.src('src/images/**/*.{jpg, png}'))
        .pipe(newer('dist/images'))
        .pipe(webp({
            quality: 80
        }))
        .pipe(gulp.dest('dist/images'));
}

exports.images = images;

// Sprite
const sprite = () => {
    return gulp.src('src/images/sprite-icons/*.svg')
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('dist/images'));
}

exports.sprite = sprite;

// Fonts
const fonts = () => {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
}

exports.fonts = fonts;

// Clean
const clean = () => {
    return del('dist');
};

// Watch
const watch = () => {
    gulp.watch('src/*.html', gulp.series(html));
    gulp.watch('src/styles/**/*.scss', gulp.series(styles));
    gulp.watch('src/scripts/*.js', gulp.series(scripts));
    gulp.watch('src/scripts/libs/*.js', gulp.series(jsLibs));
    gulp.watch('src/images/**/*', gulp.series(images));
    gulp.watch('src/images/sprite-icons/*', gulp.series(sprite));
    gulp.watch('src/fonts/**/*', gulp.series(fonts));
};

exports.watch = watch;

// Server
const server = () => {
    browserSync.init({
        cors: true,
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

exports.server = server;

// Default
exports.default = gulp.series(
    clean,
    gulp.parallel(
        html,
        styles,
        scripts,
        jsLibs,
        images,
        sprite,
        fonts
    ),
    gulp.parallel(
        watch,
        server
    ),
);