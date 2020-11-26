<?php 
namespace App\Controllers;
use Codeigniter\Controller;
use App\Libraries\Googlemaps;
use App\Models\FleetModel;
use App\Models\VehicleModel;

class Dashboard extends BaseController
{
	protected $session;
	public function index()
	{
		// fe = new Googlemaps();
		// $data['map'] = fe.create_map();
		$this->session = \Config\Services::session();
		$vehicle_model = new VehicleModel();
		$vehicles = $vehicle_model->findAll();
		$fleet_model = new FleetModel();
		$fleets = $fleet_model->findAll();
		$data['count_vehicles'] = count($vehicles);
		$data['count_fleets'] = count($fleets);

		// $user_id = $_SESSION['id'];
		// $username = $_SESSION['username'];
		echo view('templates/header');
		echo view('templates/menu');
		// echo view('templates/menu');
		echo view('dashboard', $data);
		echo view('templates/footer');
	}

	//--------------------------------------------------------------------

}
