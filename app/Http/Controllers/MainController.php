<?php namespace App\Http\Controllers;

use Helper\Docs;
use Helper\Builds;


class MainController extends Controller {
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    $this->middleware('guest');
  }

  public function index() {
    $this->docs = new Docs();
    $this->builds = new Builds();

    return view('welcome')->with([
      'og' => [
        'title' => 'footwork.js',
        'description' => 'A solid footing for web applications.',
        'url' => "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}",
        'image' => ""
      ],
      'title' => 'footwork.js',
      'siteName' => 'footwork.js',
      'buildVersion' => '34689',
      'docNavData' => json_encode($this->docs->navData()),
      'releaseList' => json_encode($this->builds->getReleases(getenv('FOOTWORK_RELEASES_FOLDER')))
    ]);
  }
}
