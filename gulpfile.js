const gulp = require('gulp');
const php = require('gulp-connect-php');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var uglify    = require('gulp-uglify');
var concat = require('gulp-concat');
const source = {
  styles: {
    src: "docs/css/styles.css",
    dest: "docs/css"
  },
  html: {
    src: '/controllers/hola_controller/*.html',
    dest: "htmlonChange"
  },
  img: {
    src: "docs/img/*.jpg",
    dest: "docs/img/minified"
  },
  scss: {
    src: "./docs/scss/style.scc",
    dest: "docs/css"
  },
  js: {
    src: ["./node_modules/angular/angular.min.js", 
    "./node_modules/angular-route/angular-route.min.js", 
    "./node_modules/angular-resource/angular-resource.min.js", 
    "./node_modules/jquery/dist/jquery.min.js",
     "./node_modules/bootstrap/dist/js/bootstrap.min.js"],
    dest: "./pruebaApi/js/"
  }
}

//Tarea que comprime imagenes
gulp.task('images', function () {
  return gulp.src(source.img.src)
    .pipe(imagemin())
    .pipe(gulp.dest(source.img.dest));
});

//tarea para convertir scss a css
gulp.task('sass', function () {
  return gulp.src(source.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(source.scss.dest));
});

// Tarea que minifica CSS
gulp.task('minify-css', () => {
  return gulp.src(source.styles.src)
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(source.styles.dest));
});
//tarea para copiar html si se modifica

gulp.task('html', function () {
  gulp.src(source.html.src)
    .pipe(gulp.dest(source.html.dest));
});

/* Iniciar Servidor */
gulp.task('serve', function () {
  browserSync.init({
    server: './controllers/hola_controller'
  });
});
//Tarea para concatenar y minificar archivos js  
gulp.task('js', () =>
  gulp.src(source.js.src)
    // './node_modules/popper.js/dist/popper.js',
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('js'))
    .pipe(uglify())
    .pipe(gulp.dest(source.js.dest))
);
/*
//Tarea para iniciar servidor de PHP
gulp.task('php', function(){
    php.server({base:'./', port:5550, keepalive:true});
});
//Sincronización con el navegador
gulp.task('browserSync', function() {
    browserSync.init({
      proxy:"localhost:5550",
      baseDir: "./docs/html/./",
      open:true,
      notify:false
    });
});
*/
gulp.task('default', ['serve', 'js'], function () {
  //gulp.watch(source.html.src, browserSync.reload);
  gulp.watch(source.html.src, ['html']).on('change', browserSync.reload);
});