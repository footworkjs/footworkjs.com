<?php namespace Helper;

class Docs {
  public function navData() {
    $docsFolder = public_path()."/docs";
    $navData = [];
    $isLocalEnv = getenv('APP_ENV') === 'local' ? true : false;

    if(!$isLocalEnv) {
      $redis = \Illuminate\Support\Facades\Redis::connection();
      $navData = $redis->get($docsFolder);
    }

    if(empty($navData)) {
      $releaseList = array_filter( scandir( $docsFolder ), function($releaseFolder) use ($docsFolder) {
        return $releaseFolder !== '..' && $releaseFolder !== '.';
      });
      arsort($releaseList);

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

      if(!$isLocalEnv) {
        $redis->set($docsFolder, json_encode($navData));
      }
    } else {
      $navData = json_decode($navData);
    }

    return $navData;
  }
}
