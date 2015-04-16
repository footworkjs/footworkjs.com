<?php namespace Helper;

class Builds {
  private function formatBytes($size, $precision = 2) {
    $base = log(floatval($size)) / log(1024);
    $suffixes = array('', 'kb', 'MB', 'GB', 'TB');
    return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
  }

  private function getBuildInfo($buildFile) {
    $gzipFile = "{$buildFile}.gz";
    $gzSize = strlen(gzdeflate(file_get_contents($buildFile), 9));

    return [
      'build' => basename($buildFile),
      'filesize' => $this->formatBytes(filesize($buildFile), 0),
      'gzFilesize' => $this->formatBytes($gzSize, 0)
    ];
  }

  private function getBuildNameFromFileName($fileName) {
    if(preg_match('/^footwork-([a-z-]+)(\.min){0,1}\.js$/', $fileName, $matches)) {
      return $matches[1];
    }
    return null;
  }

  private function getReleaseBuilds($profileDirectory) {
    $profileList = array_values( array_filter(scandir( $profileDirectory ), function($fileName) use ($profileDirectory) {
      return is_file("{$profileDirectory}/{$fileName}") && preg_match('/^footwork[-\w\.]+\.js$/', $fileName) && !preg_match('/^footwork-raw.+/', $fileName);
    }) );

    $buildController = $this;
    return array_map(function($buildFile) use ($profileDirectory, $buildController) {
      $buildName = $this->getBuildNameFromFileName($buildFile);
      $dependencies = [];

      if(array_key_exists('buildDeps', $buildController->packageInfo) && array_key_exists($buildName, $buildController->packageInfo['buildDeps'])) {
        $dependencies = $buildController->packageInfo['buildDeps'][$buildName];
      } else {
        // 0.8.x support patched in here, those versions had no buildDeps property/definition
        switch($buildName) {
          case 'all':
            $dependencies = [
              'required' => [],
              'optional' => [
                ['label' => 'History.js', 'url' => 'https://github.com/browserstate/history.js/', 'note' => 'Used for browser history and router integration' ]
              ]
            ];
            break;

          case 'minimal':
            $dependencies = [
              'required' => [
                ['label' => 'Knockout.js', 'url' => 'http://knockoutjs.com/', 'note' => 'v3.2' ],
                ['label' => 'Lodash', 'url' => 'https://lodash.com/' ]
              ],
              'optional' => [
                ['label' => 'History.js', 'url' => 'https://github.com/browserstate/history.js/', 'note' => 'Used for browser history and router integration' ]
              ]
            ];
            break;

          case 'bare':
            $dependencies = [
              'required' => [
                ['label' => 'Knockout.js', 'url' => 'http://knockoutjs.com/', 'note' => 'v3.2' ],
                ['label' => 'Lodash', 'url' => 'https://lodash.com/' ],
                ['label' => 'postal.js', 'url' => 'https://github.com/postaljs/postal.js']
              ],
              'optional' => [
                ['label' => 'History.js', 'url' => 'https://github.com/browserstate/history.js/', 'note' => 'Used for browser history and router integration' ]
              ]
            ];
            break;
        }
      }

      return array_replace($this->getBuildInfo("{$profileDirectory}/{$buildFile}"), [
        'dependencies' => $dependencies
      ]);
    }, $profileList);
  }

  private function getProfileList($releaseBuilds) {
    $profiles = array_reduce($releaseBuilds, function($profiles, $build) {
      $buildName = $this->getBuildNameFromFileName($build['build']);
      if(!in_array($buildName, $profiles)) {
        $profiles[] = $buildName;
      }
      return $profiles;
    }, []);

    // sort according to the preferred order
    $preferOrder = [
      'all',
      'all-history',
      'minimal',
      'bare',
      'bare-jquery',
      'bare-reqwest'
    ];
    $orderedProfiles = [];
    foreach($preferOrder as $val){
      if(in_array($val, $profiles)) {
        $orderedProfiles[] = $val;
      }
    }
    foreach($profiles as $profile) {
      if(!in_array($profile, $orderedProfiles)) {
        $orderedProfiles[] = $profile;
      }
    }

    return $orderedProfiles;
  }

  private function getReleaseInfo($release) {
    $releasesFolder = getenv('FOOTWORK_RELEASES_FOLDER');
    $releaseFolder = "{$releasesFolder}/{$release}";
    $distributionFolder = "{$releaseFolder}/dist";
    $packageJSON = file_get_contents("{$releaseFolder}/package.json");
    $this->packageInfo = json_decode($packageJSON, true);

    $releaseBuilds = $this->getReleaseBuilds($distributionFolder);
    $profileList = $this->getProfileList($releaseBuilds);

    return [
      'profileList' => $profileList,
      'builds' => $releaseBuilds
    ];
  }

  public function getReleases($releasesFolder) {
    $releaseList = null;
    $isLocalEnv = getenv('APP_ENV') === 'local' ? true : false;

    if(!$isLocalEnv) {
      $redis = \Illuminate\Support\Facades\Redis::connection();
      $releaseList = $redis->get($releasesFolder);
    }

    if(empty($releaseList)) {
      if(is_dir($releasesFolder)) {
        $releaseList = array_filter( scandir( $releasesFolder ), function($path) use ($releasesFolder) {
          return is_dir("{$releasesFolder}/{$path}") && $path !== '..' && $path !== '.';
        });
        arsort($releaseList);

        $releaseList = array_reduce(
          array_map(function($release) {
              return [ 'version' => $release, 'info' => $this->getReleaseInfo($release) ];
          }, array_values($releaseList)),
          function($carry, $item) {
            $carry[$item['version']] = $item['info'];
            return $carry;
          }, []
        );

        if(!$isLocalEnv) {
          $redis->set($releasesFolder, json_encode($releaseList));
        }
      }
    } else {
      $releaseList = json_decode($releaseList, true);
    }

    return $releaseList;
  }
}
