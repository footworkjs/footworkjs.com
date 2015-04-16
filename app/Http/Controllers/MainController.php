<?php namespace App\Http\Controllers;

use Helper\Docs;
use Helper\Builds;
use \Mobile_Detect;

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
    $isLocalEnv = getenv('APP_ENV') === 'local' ? true : false;

    $docs = new Docs();
    $builds = new Builds();
    $detect = new Mobile_Detect();

    $isMobile = false;
    $isTablet = false;
    $isIOS = false;
    if($detect->isMobile() && !$detect->isTablet()) {
      $isMobile = true;
    }
    if($detect->isTablet()) {
      $isTablet = true;
    }

    $buildVersion = null;
    if(!$isLocalEnv) {
      $redis = \Illuminate\Support\Facades\Redis::connection();
      $buildVersion = $redis->get('buildVersion');
    }

    if(empty($buildVersion)) {
      $package = json_decode(file_get_contents(base_path().'/package.json'), true);

      if(!$isLocalEnv) {
        $redis->set('buildVersion', $buildVersion);
        $redis->expire('buildVersion', 3600);
      }

      $buildVersion = $package['buildVersion'];
    }

    return view('welcome')->with([
      'isMobile' => $isMobile,
      'isTablet' => $isTablet,
      'og' => [
        'title' => 'footwork.js',
        'description' => 'A solid footing for web applications.',
        'url' => "http://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}",
        'image' => ""
      ],
      'title' => 'footwork.js',
      'siteName' => 'footwork.js',
      'buildVersion' => $buildVersion,
      'docNavData' => json_encode($docs->navData()),
      'releaseList' => json_encode($builds->getReleases(getenv('FOOTWORK_RELEASES_FOLDER')))
    ]);
  }
}
