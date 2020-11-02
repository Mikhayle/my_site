const gulpCleanCss = require('gulp-clean-css');

const projectFolder = 'dist';
const sourceFolder = 'src';

const path = {
    build: {
        html: projectFolder + '/',
        css: projectFolder + '/css/',
        js: projectFolder  + '/js/',
        img: projectFolder + '/img/',
        fonts: projectFolder + '/fonts/'
    },
    src: {
        html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html'],
        css: sourceFolder + '/sass/main.sass',
        js: sourceFolder  + '/js/main.js',
        img: sourceFolder + '/img/**/*.{jpg,gif,png,svg,ico,webp}',
        fonts: sourceFolder + '/fonts/*.ttf'
    },
    watch: {
        html: sourceFolder + '/**/*.html',
        css: sourceFolder + '/sass/**/*.sass',
        js: sourceFolder  + '/js/**/*.js',
        img: sourceFolder + '/img/**/*.{jpg,gif,png,svg,ico,webp}'
    },
    clean: './' + projectFolder + '/'

}

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    groupMediaQueries = require('gulp-group-css-media-queries'),
    cssClean = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify =  require('gulp-uglify-es').default,
    imagemin = require('gulp-imagemin');
    // webp = require('gulp-webp'),
    // webpHtml = require('gulp-webp-html'),
    // webpCss = require('gulp-webpcss');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + projectFolder + '/'
        },
        port: 3000,
        notify: false
    });
};

const html = () => {
    return gulp.src(path.src.html)
        .pipe(fileinclude())
        // .pipe(webpHtml())
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream())
};

const css = () => {
    return gulp.src(path.src.css)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupMediaQueries())
        .pipe(autoprefixer({
            overrideBrowserlist: ['last 5 versions'],
            cascade: true
        }))
        // .pipe(webpCss())
        .pipe(gulp.dest(path.build.css))
        .pipe(cssClean())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream())
};

const js = () => {
    return gulp.src(path.src.js)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream())
};

const images = () => {
    return gulp.src(path.src.img)
        // .pipe(webp({
        //         quality: 70
        // })) 
        // .pipe(gulp.dest(path.build.img))
        .pipe(gulp.src(path.src.img))
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))        
        .pipe(gulp.dest(path.build.img))
        .pipe(browsersync.stream())
};

const watchFiles = () => {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
};

const clean = () => {
    return del(path.clean)
};

const build = gulp.series(clean, gulp.parallel(js, css, html, images));
const watch = gulp.parallel(build, watchFiles, browserSync);
 

exports.build = build;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.default = watch;
exports.watch = watch;