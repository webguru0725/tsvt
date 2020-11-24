<?php namespace App\Controllers;
use App\Models\FleetModel;
use CodeIgniter\Config\Config;

class Fleet extends BaseController
{
	public function index()
	{
        $this->session = \Config\Services::session();
		$data = [];
        $this->fleets_get();
		// echo view('templates/header');
		// echo view('templates/menu');
		// echo view('fleet');
		// echo view('templates/footer');
    }
    
    public function fleets_get()
    {
        $table = "groupinfo";
        $model = new FleetModel();
        $fleets = $model->findAll();
        $data['fleets'] = $fleets;
        echo view('templates/header');
		echo view('templates/menu');
		echo view('fleet', $data);
		echo view('templates/footer');

    }

	//--------------------------------------------------------------------

}
