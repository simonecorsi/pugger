<?php


$pug = new Pug\Pug(array(
  'prettyprint' => true,
  'extension' => '.pug',
  'basedir' => realpath('./../resources/views'),
  'cache' => realpath('./../storage/framework/views'),
));


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app, $pug) {
  return $pug->render($pug->getOption('basedir') . '/index.pug');
});
