<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/docs/navigation-data', 'DocsController@navData');
Route::get('release/list', 'BuildController@listReleases');
Route::get('release/{version}/download/{buildFile}', 'BuildController@downloadReleaseFile');

Route::get('docs/{path?}', [ 'middleware' => 'validDoc', 'uses' => 'MainController@index'])->where('path', '.+');

Route::get('{path?}', 'MainController@index')->where('path', '.+');
