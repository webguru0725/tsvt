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
        $data_header['menu_index'] = "fleet";
        echo view('templates/header');
		echo view('templates/menu', $data_header);
		echo view('fleet', $data);
		echo view('templates/footer');

    }

    public function fleets_ajax_get()
    {
        $table = "groupinfo";
        $model = new FleetModel();
        $fleets = $model->findAll();
        $new_fleets = array();
        foreach($fleets as $fleet)
        {
            $fleet['fatherName'] = "";
            foreach($fleets as $row)
            {
                if($fleet['GroupFatherID'] === $row['ID'])
                {
                    $fleet['fatherName'] = $row['GroupName'];
                }
            }
            $new_fleets[] = $fleet;
        }
        $data['fleets'] = $new_fleets;
        echo json_encode($data);
        // $data1['fleets'] = $fleets;
       
        // echo json_encode($data1);
    }

	//--------------------------------------------------------------------

}
