<?php

class Message
{
    private $id;
    private $text;
    private $created;
    private $fromId;
    private $toId;

	public function __construct($id, $text, $created, $fromId, $toId){
        $this->id = $id;
        $this->text = $text;
        $this->created = $created;
        $this->fromId = $fromId;
        $this->toId = $toId;
    }
	
	//TODO: geteri i seteri za sve propertije 
	
	
    public function toJSON(){
        $json = array(
            'id' => $this->id,
            'text' => $this->text,
            'created' => $this->created,
            'fromId' => $this->fromId,
            'toId' => $this->toId
        );

        return json_encode($json);
    }

}

?>