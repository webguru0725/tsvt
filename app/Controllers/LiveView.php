<?php namespace App\Controllers;
use App\Libraries\Googlemaps;
use APP\Libraries\VideoStream;
use App\Models\FleetModel;
use App\Models\VehicleModel;
use App\Models\DeviceModel;
use CodeIgniter\Config\Config;

class LiveView extends BaseController
{
	public function index()
	{
        $this->session = \Config\Services::session();
		$data = [];
		// $map = new Googlemaps();
		// $config['center'] = '37.4419, -122.1419';
		// $config['zoom'] = 'auto';
		// $map->initialize($config);
		// $marker = array();
		// $marker['position'] = '37.429, -122.1419';
		// $map->add_marker($marker);
		// $data['map'] = $map->create_map();

		// $stream = new VideoStream('http://51.77.84.46:12060/live.flv?devid=0099016162&chl=2&svrid=127.0.0.1&svrport=17891&st=1&audio=1');
		// print_r($stream); exit;
		// $stream->start();

        $model_fleet = new FleetModel();
		$fleets = $model_fleet->findAll();
		$model_vehicle = new VehicleModel();
		$vehicles = $model_vehicle->findAll();
		$model_device = new DeviceModel();

		for($i = 0; $i < count($vehicles); $i++)
		{
			$device = $model_device->where('VehicleDeviceID', $vehicles[$i]['ID'])->first();
			$vehicles[$i]['channel'] = $device['ChannelCount'];
		}
		
		$data['fleets'] = $fleets;
		$data['vehicles'] = $vehicles;
		echo view('templates/header');
		echo view('templates/menu');
		echo view('liveview', $data);
		echo view('templates/footer');
    }
    
	//--------------------------------------------------------------------
}
