<?php 
namespace App\Controllers;
use Codeigniter\Controller;
use App\Libraries\Googlemaps;

class Dashboard extends BaseController
{
	public function index()
	{
		fe = new Googlemaps();
		$data['map'] = fe.create_map();
		echo view('templates/header');
		echo view('templates/menu');
		// echo view('templates/menu');
		echo view('dashboard', $data);
		echo view('templates/footer');
	}

	//--------------------------------------------------------------------

}
