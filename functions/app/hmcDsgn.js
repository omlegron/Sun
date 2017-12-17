// lazyload config

angular.module('mypjtOm')
.constant('MODULE_CONFIG', [
{
  name: 'HcHm',
  module: true,
  files: [
  'public/UsrAlumni/dashboard/css/prettyPhoto.css',
  'public/UsrAlumni/dashboard/css/main.css',
  'public/UsrAlumni/dashboard/css/responsive.css',
  'public/UsrAlumni/dashboard/js/smoothscroll.js',
  'public/UsrAlumni/dashboard/js/jquery.isotope.min.j',
  'public/UsrAlumni/dashboard/js/jquery.prettyPhoto.js',
  'public/UsrAlumni/dashboard/js/jquery.parallax.js',
  'public/UsrAlumni/dashboard/js/main.js',
   'public/HomyC/assets/css/style.css'
]},

  {
    name: 'HcHmDash',
    module: true,
    files: [
    'public/UsrAlumni/login/css/style.css',
    'js/controllers/homycare/Dashboard.js'
  ]},

// <!-- Design Css & JS Login UsrAlumni-->
  {
    name: 'HcLogin',
    module: true,
    files: [
    'public/UsrAlumni/login/css/style.css'
  ]},

// <!-- Design Css & JS Login UsrAlumni-->
  {
    name: 'HcSignup',
    module: true,
    files: [
    'public/UsrAlumni/signup/signup.css'
  ]}

])
.config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: false,
    modules: MODULE_CONFIG
  });
}]);
