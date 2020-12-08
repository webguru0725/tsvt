<?php namespace App\Models;

use CodeIgniter\Model;

class VehicleModel extends Model{
  protected $table = 'vehicledevice';
 
  // public function getUser()
  // {
  //   $this->db->findall;
  //   $this->db->from($table);
  //   $query = $this->db->get();
  //   return $query->result_array();
  // }

  public function getVehiclesWithDevice()
  {
      $db = \Config\Database::connect();
      $builder = $db->table('vehicledevice');
      
      return $builder->join('devicefile', 'vehicledevice.ID = devicefile.VehicleDeviceID')->get()->getResult();
      // return $builder->join('userinfo', 'userinfo.RoleID =' $role_id, 'left')->join('registerlogin', 'registerlogin.ID = userinfo.RegisterLoginID', 'left')->where(['ID' => $role_id])->get()->getResult();
  }

  public function getVehiclebyID($id)
  {
    $db = \Config\Database::connect();
    $builder = $db->table('vehicledevice');
    
    return $builder->join('groupinfo', 'vehicledevice.GroupID = groupinfo.ID')->where(['vehicledevice.ID' => $id])->get()->getResult();
  }

}
