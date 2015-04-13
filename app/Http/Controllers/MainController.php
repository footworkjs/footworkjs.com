<?php namespace App\Http\Controllers;

class MainController extends Controller {
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    $this->middleware('guest');
    view()->share('title', 'footwork.js');
    view()->share('siteName', 'footwork.js');
    view()->share('og', [
      'title' => 'footwork.js',
      'description' => 'A solid footing for web applications.',
      'url' => "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}",
      'image' => ""
    ]);
  }

  public function index() {
    return view('welcome');
  }
}
