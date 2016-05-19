<?php

class Gift
{
    private $id;
    private $name;
    private $description;
    private $image1Path;
    private $image2Path;
    private $image3Path;
	private $active;
	private $categoryId;
	private $ownerId;

	public function __construct($id, $name, $description, $image1Path, $image2Path, $image3Path, $active, $categoryId, $ownerId){
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->image1Path = $image1Path;
        $this->image2Path = $image2Path;
        $this->image3Path = $image3Path;
		$this->active = $active;
        $this->categoryId = $categoryId;
        $this->ownerId = $ownerId;
    }
	
    public function getName()
    {
        return $this->name;
    }

	//TODO: geteri i seteri za sve propertije 
	
	
    public function toJSON(){
        $json = array(
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image1Path' => $this->image1Path,
            'image2Path' => $this->image2Path,
            'image3Path' => $this->image3Path,
			'active' => $this->active(),
            'categoryId' => $this->categoryId,
            'ownerId' => $this->ownerId
        );

        return json_encode($json);
    }

}

?>