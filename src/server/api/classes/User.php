<?php

class User
{
    public $id;
    public $email;
    public $password;
    public $fullName;
    public $address;
    public $phone;
	public $created;
	public $userTypeId;

	public function __construct($id, $email, $password, $fullName, $address, $phone, $created, $userTypeId){
        $this->id = $id;
        $this->email = $email;
        $this->password = $password;
        $this->fullName = $fullName;
        $this->address = $address;
        $this->phone = $phone;
		$this->created = $created;
        $this->userTypeId = $userTypeId;
    }
	
	//TODO: geteri i seteri za sve propertije 
	
	
    public function toJSON(){
        $json = array(
            'id' => $this->id,
            'email' => $this->email,
            'password' => $this->password,
            'fullName' => $this->fullName,
            'address' => $this->address,
            'phone' => $this->phone,
			'created' => $this->created,
            'userTypeId' => $this->userTypeId
        );

        return json_encode($json);
    }

}

?>