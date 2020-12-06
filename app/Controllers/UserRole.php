<?php 
namespace App\Controllers;
use Codeigniter\Controller;
use App\Libraries\Googlemaps;
use App\Models\UserRoleModel;

class UserRole extends BaseController
{
	protected $session;
	public function index()
	{
		$this->session = \Config\Services::session();
		$data = [];
        $this->userroles_get();
    }
    
    public function userroles_get()
    {
        $model = new UserRoleModel();
        $userroles = $model->findAll();
        $data['userroles'] = $userroles;
        echo view('templates/header');
		echo view('templates/menu');
		echo view('userrole', $data);
		echo view('templates/footer');

    }

    public function users_ajax_get($role_id)
    {
        $model = new UserRoleModel();
        if($role_id == 1)
        {
            $users = $model->getUsers();
        }
        else
        {
            $users = $model->getUsersByRoleID($role_id);
        }
        
        $data['users'] = $users;
        echo json_encode($data);
    }

    public function role_add_ajax_post()
    {
        $model = new UserRoleModel();
        $role_name = $this->request->getPost('role_name');
        $parent_role_id = $this->request->getPost('parent_role_id');
        $data = [
            'RoleName' => $role_name,
            'RoleFatherID' => $parent_role_id,
            'RoleType' => 1
        ];
        $save = $model->insert($data);
        echo json_encode($save);
    }

	//--------------------------------------------------------------------

}
