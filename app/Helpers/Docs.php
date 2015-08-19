<?php namespace Helper;

class Docs {
  public function navData() {
    $docsFolder = public_path()."/docs";
    $redisKey = "DOC_NAVDATA:{$docsFolder}";
    $navData = [];
    $isLocalEnv = getenv('APP_ENV') === 'local' ? true : false;

    if(!$isLocalEnv) {
      $redis = \Illuminate\Support\Facades\Redis::connection();
      $navData = $redis->get($redisKey);
    }

    if(empty($navData)) {
      $releaseList = array_filter(scandir($docsFolder), function($releaseFolder) use ($docsFolder) {
        return $releaseFolder !== '..' && $releaseFolder !== '.';
      });
      arsort($releaseList);

      foreach($releaseList as $release) {
        if(file_exists("{$docsFolder}/{$release}/menu.json")) {
          $releaseJSON = array_map(function($pageData) {
            if(preg_match('/([a-zA-Z-]+)\.html$/', $pageData['page'], $matches)) {
              $pageData['page'] = $matches[1];
            }
            return $pageData;
          }, json_decode(file_get_contents("{$docsFolder}/{$release}/menu.json"), true));

          $navData[$release] = $releaseJSON;
        }
      }

      if(!$isLocalEnv) {
        $redis->set($redisKey, json_encode($navData));
      }
    } else {
      $navData = json_decode($navData);
    }

    return $navData;
  }

  public function searchData($version) {
    $docsFolder = public_path()."/docs/{$version}";
    $redisKey = "DOC_SEARCH:{$docsFolder}";
    $searchData = [];
    $isLocalEnv = getenv('APP_ENV') === 'local' ? true : false;

    if(!$isLocalEnv) {
      $redis = \Illuminate\Support\Facades\Redis::connection();
      $searchData = $redis->get($redisKey);
    }

    if(empty($searchData)) {
      $docList = array_filter(scandir($docsFolder), function($releaseFolder) use ($docsFolder) {
        return $releaseFolder !== '..' && $releaseFolder !== '.';
      });

      foreach($docList as $docFile) {
        $docJSON = '';
        $docText = file_get_contents("{$docsFolder}/{$docFile}");
        if($docText !== false) {
          $metaData = array();
          if(preg_match('/<div id="metaData">([\s\S]*)<\/div>/', $docText, $metaData)) {
            $metaData = $metaData[1];
            $searchData[$docFile] = json_decode($metaData);
          }
        }
      }

      if(!$isLocalEnv) {
        $redis->set($redisKey, json_encode($searchData));
      }
    } else {
      $searchData = json_decode($searchData);
    }

    return $searchData;
  }
}
