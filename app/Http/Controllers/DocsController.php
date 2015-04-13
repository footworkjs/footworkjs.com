<?php namespace App\Http\Controllers;

class DocsController extends Controller {
  public function __construct() {
    $this->middleware('guest');
  }

  public function navData() {
    $docsFolder = public_path()."/docs";
    $releaseList = array_filter( scandir( $docsFolder ), function($releaseFolder) use ($docsFolder) {
      return is_dir("{$docsFolder}/{$releaseFolder}") && $releaseFolder !== '..' && $releaseFolder !== '.';
    });
    arsort($releaseList);

    $navData = [];
    foreach($releaseList as $release) {
      if(file_exists("{$docsFolder}/{$release}/menu.json")) {
        $releaseJSON = array_map(function($pageData) {
          if(preg_match('/([a-zA-Z-]+)-page\.html$/', $pageData['page'], $matches)) {
            $pageData['page'] = $matches[1];
          }
          return $pageData;
        }, json_decode(file_get_contents("{$docsFolder}/{$release}/menu.json"), true));

        $navData[$release] = $releaseJSON;
      }
    }

    return response()->json($navData);
  }
}
