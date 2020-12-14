<?php namespace App\Controllers;
use App\Models\FleetModel;
use App\Models\VehicleModel;
use App\Models\DeviceModel;


class Playback extends BaseController
{
	public function index()
	{
		$data = [];

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
		echo view('playback', $data);
		echo view('templates/footer');
	}

	//--------------------------------------------------------------------

}
