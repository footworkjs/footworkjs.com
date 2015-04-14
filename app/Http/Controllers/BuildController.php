<?php namespace App\Http\Controllers;

use Helper\Builds;

class BuildController extends Controller {
  private $packageInfo;

  public function __construct() {
    $this->middleware('guest');
    $this->builds = new Builds();
  }

  public function listReleases() {
    return response()->json($this->builds->getReleases(getenv('FOOTWORK_RELEASES_FOLDER')));
  }

  public function downloadReleaseFile($version, $buildFileName) {
    $releaseFolder = getenv('FOOTWORK_RELEASES_FOLDER');
    $filePath = "{$releaseFolder}/{$version}/dist/{$buildFileName}";
    if(preg_match('/^footwork[-\w\.]+\.js$/', $buildFileName) && preg_match('/^[0-9]+\.[0-9]+\.[0-9\-a-zA-Z]+$/', $version) && is_file($filePath)) {
      return response()->download($filePath , $buildFileName, [
        "Content-Type" => "application/javascript"
      ]);
    }
    return redirect('/');
  }
}
