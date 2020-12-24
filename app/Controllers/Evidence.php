<?php namespace App\Controllers;
use App\Libraries\Googlemaps;
use APP\Libraries\VideoStream;
use App\Models\FleetModel;
use App\Models\VehicleModel;
use App\Models\DeviceModel;
use CodeIgniter\Config\Config;

class Evidence extends BaseController
{
	public function index()
	{
        $this->session = \Config\Services::session();
		$data = [];
	
		echo view('templates/header');
		echo view('templates/menu');
		echo view('evidence');
		echo view('templates/footer');
	}
	
	//--------------------------------------------------------------------
}
