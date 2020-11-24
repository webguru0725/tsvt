<?php 
namespace App\Controllers;
use Codeigniter\Controller;
use App\Libraries\Googlemaps;

class Dashboard extends BaseController
{
	protected $session;
	public function index()
	{
		// fe = new Googlemaps();
		// $data['map'] = fe.create_map();
		$this->session = \Config\Services::session();

		$user_id = $_SESSION['id'];
		$username = $_SESSION['username'];
		echo view('templates/header');
		echo view('templates/menu');
		// echo view('templates/menu');
		echo view('dashboard');
		echo view('templates/footer');
	}

	//--------------------------------------------------------------------

}
