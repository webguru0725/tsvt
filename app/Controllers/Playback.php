<?php namespace App\Controllers;

class Playback extends BaseController
{
	public function index()
	{
		$data = [];

		echo view('templates/header');
		echo view('templates/menu');
		echo view('playback');
		echo view('templates/footer');
	}

	//--------------------------------------------------------------------

}
