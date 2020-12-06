<?php namespace App\Models;

use CodeIgniter\Model;

class UserRoleModel extends Model{
    protected $table = 'roleinfo';
    protected $allowedFields = ['RoleName', 'RoleType', 'RoleFatherID'];

    public function getUsersByRoleID($role_id)
    {
        $db = \Config\Database::connect();
        $builder = $db->table('roleinfo');
        
        return $builder->join('userinfo', 'userinfo.RoleID = roleinfo.ID')->join('registerlogin', 'registerlogin.ID = userinfo.RegisterLoginID')->where(['roleinfo.ID' => $role_id])->get()->getResult();
        // return $builder->join('userinfo', 'userinfo.RoleID =' $role_id, 'left')->join('registerlogin', 'registerlogin.ID = userinfo.RegisterLoginID', 'left')->where(['ID' => $role_id])->get()->getResult();
    }

    public function getUsers()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('roleinfo');
        
        return $builder->join('userinfo', 'userinfo.RoleID = roleinfo.ID')->join('registerlogin', 'registerlogin.ID = userinfo.RegisterLoginID')->get()->getResult();
        // return $builder->join('userinfo', 'userinfo.RoleID =' $role_id, 'left')->join('registerlogin', 'registerlogin.ID = userinfo.RegisterLoginID', 'left')->where(['ID' => $role_id])->get()->getResult();
    }
 
  // public function getUser()
  // {
  //   $this->db->findall;
  //   $this->db->from($table);
  //   $query = $this->db->get();
  //   return $query->result_array();
  // }

}
