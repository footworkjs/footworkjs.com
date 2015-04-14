<?php namespace App\Http\Controllers;
use Helper\Docs;


class MainController extends Controller {
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    $this->middleware('guest');
    $this->docs = new Docs();
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
    return view('welcome')->with([
      'docNavData' => json_encode($this->docs->navData()),
      'releaseList' => json_encode($this->docs->getReleases(getenv('FOOTWORK_RELEASES_FOLDER')))
    ]);
  }
}
