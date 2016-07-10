<?php

class Offer
{
    public $id;
    public $ownerId;
    public $offererId;
    public $giftId;
    public $created;
    public $accepted;
    public $comment;

	public function __construct($ownerId, $offererId, $giftId, $accepted, $comment){
        $this->ownerId = $ownerId;
        $this->offererId = $offererId;
        $this->giftId = $giftId;
        $this->comment = $comment;
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
            'accepted' => $this->accepted,
            'comment' => $this->comment
        );

        return json_encode($json);
    }

}

?>