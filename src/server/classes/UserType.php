<?php

class UserType
{
    private $id;
    private $description;

	public function __construct($id, $description){
        $this->id = $id;
        $this->description = $description;
    }
	
	//TODO: geteri i seteri za sve propertije 
	
	
    public function toJSON(){
        $json = array(
            'id' => $this->id,
            'description' => $this->description
        );

        return json_encode($json);
    }

}

?>