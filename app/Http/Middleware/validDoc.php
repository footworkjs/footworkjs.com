<?php namespace App\Http\Middleware;

use Closure;

class validDoc {
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
    $pathParts = explode('/', $request->path());
    $version = $pathParts[1];
    $filePath = array_slice($pathParts, 2);

    $path = base_path()."/public/docs/{$version}/".implode('/', $filePath).".html";
    if(!file_exists($path)) {
      abort(404);
    }

		return $next($request);
	}
}
