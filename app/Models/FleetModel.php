<?php namespace App\Models;

use CodeIgniter\Model;

class FleetModel extends Model{
  protected $table = 'groupinfo';
  protected $allowedFields = ['GroupName', 'GroupFatherID', 'Remark'];
 
  // public function getUser()
  // {
  //   $this->db->findall;
  //   $this->db->from($table);
  //   $query = $this->db->get();
  //   return $query->result_array();
  // }

}
