<?php namespace App\Controllers;
use App\Models\FleetModel;
use CodeIgniter\Config\Config;

class LiveView extends BaseController
{
	public function index()
	{
        $this->session = \Config\Services::session();
		$data = [];
        
		echo view('templates/header');
		echo view('templates/menu');
		echo view('liveview');
		echo view('templates/footer');
    }
    
	//--------------------------------------------------------------------
}
