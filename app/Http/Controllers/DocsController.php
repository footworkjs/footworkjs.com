<?php namespace App\Http\Controllers;

use Helper\Docs;

class DocsController extends Controller {
  public function __construct() {
    $this->middleware('guest');
    $this->docs = new Docs();
  }

  public function navData() {
    return response()->json($this->docs->navData());
  }

  public function searchData($version) {
    return response()->json($this->docs->searchData($version));
  }
}
