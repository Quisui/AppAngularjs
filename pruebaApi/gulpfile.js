/* 
FUNCIONES DE NIVEL SUPERIOR UTILIZADAS EN GULP 
gulp.task : se utiliza para definir la tarea. 
gulp.src : se utiliza para señalar el archivo que se utilizará. 
gulp.dest : se usa para apuntar a la carpeta de salida. 
gulp.watch: esta función observa los cambios en los archivos para que no tengamos que ejecutar cada vez una función cuando se realiza un cambio.
*/

let gulp  = require('gulp'),
rename = require("gulp-rename"),
concat    = require('gulp-concat'),
minifycss =require('gulp-minify-css'),
uglify    = require('gulp-uglify'),
browserSync = require('browser-sync').create(),
sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('default',  () => {
 
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch("./scss/*.scss", gulp.series('sass','reload'));
    gulp.watch('./controller.js', gulp.series('js','reload'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});
 
gulp.task("reload", (done) => { browserSync.reload(); done(); });

//Tarea para compilar archivos scss a css
gulp.task('sass', () =>
    gulp.src('./scss/imports.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(minifycss())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('dist/'))
);

//Tarea para concatenar y minificar archivos js  
gulp.task('js', () =>
    gulp.src(['./node_modules/jquery/dist/jquery.js','./node_modules/bootstrap/dist/js/bootstrap.js','./node_modules/angular/angular.js'])
    // './node_modules/popper.js/dist/popper.js',
     .pipe(concat('scripts.min.js'))
     .pipe(gulp.dest('js'))
     .pipe(uglify())
     .pipe(gulp.dest('./dist/'))
);
