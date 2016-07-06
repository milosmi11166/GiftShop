<?php

class Offer
{
    public $id;
    public $ownerId;
    public $offererId;
    public $giftId;
    public $created;
    public $accepted;

	public function __construct($id, $ownerId, $offererId, $giftId, $created, $accepted){
        $this->id = $id;
        $this->ownerId = $ownerId;
        $this->offererId = $offererId;
        $this->giftId = $giftId;
        $this->created = $created;
        $this->accepted = $accepted;
    }
	
	//TODO: geteri i seteri za sve propertije 
	
	
    public function toJSON(){
        $json = array(
            'id' => $this->id,
            'ownerId' => $this->ownerId,
            'offererId' => $this->offererId,
            'giftId' => $this->giftId,
            'created' => $this->created,
            'accepted' => $this->accepted
        );

        return json_encode($json);
    }

}

?>