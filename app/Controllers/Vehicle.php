<?php namespace App\Controllers;
use App\Models\VehicleModel;
use App\Models\FleetModel;
use CodeIgniter\Config\Config;

class Vehicle extends BaseController
{
	public function index()
	{
        $this->session = \Config\Services::session();
		$data = [];
        $this->vehicle_get();
		// echo view('templates/header');
		// echo view('templates/menu');
		// echo view('fleet');
		// echo view('templates/footer');
    }
    
    public function vehicle_get()
    {
        $model = new VehicleModel();
        $vehicles = $model->findAll();
        $model_fleet = new FleetModel();
        $fleets = $model_fleet->findAll();
        $data['vehicles'] = $vehicles;
        $data['fleets'] = $fleets;
        echo view('templates/header');
		echo view('templates/menu');
		echo view('vehicle', $data);
		echo view('templates/footer');

    }

    public function vehicle_ajax_get($fleet_id)
    {
        $table = "groupinfo";
        $model = new VehicleModel();
        if($fleet_id == 1)
        {
            $vehicles = $model->findAll();
        }
        else{
            $vehicles = $model->where('GroupID', $fleet_id)->findAll();
        }
        $model_fleet = new FleetModel();
        $all_fleets = $model_fleet->findAll();
        $new_vehicles = array();
        $result = array();
        if(count($vehicles) === 0)
        {
            $fleets = $model_fleet->where('GroupFatherID', $fleet_id)->findAll();
            for($i = 0; $i < count($fleets); $i++)
            {
                $vehicles = $model->where('GroupID', $fleets[$i]['ID'])->findAll();
                foreach($vehicles as $vehicle)
                {
                    array_push($new_vehicles, $vehicle);
                }
            }
        }
        else{
            $new_vehicles = $vehicles;
        }
        foreach($new_vehicles as $avehicle)
        {
            $avehicle['fatherName'] = "";
            foreach($all_fleets as $row)
            {
                if($avehicle['GroupID'] === $row['ID'])
                {
                    $avehicle['fatherName'] = $row['GroupName'];
                }
            }
            $result[] = $avehicle;
        }
        $data['vehicles'] = $result;
        echo json_encode($data);
        // $data1['fleets'] = $fleets;
       
        // echo json_encode($data1);
    }

	//--------------------------------------------------------------------

}
