<?php
    
	require_once('include/db.php');

	//include
	include('classes/Gift.php');
	include('classes/User.php');
    include('classes/Message.php');
    include('classes/Offer.php');
    include('classes/UserType.php');
    include('classes/Category.php');
    
    function deserializeGift($json)
    {
        $d = json_decode($json, true);
        
        return new Gift($d['name'], $d['description'], $d['image1Path'], $d['image2Path'], $d['image3Path'], $d['active'], $d['categoryId'], $d['ownerId']);
    }
    
    function deserializeOffer($json)
    {
        $d = json_decode($json, true);
        
        return new Offer($d['id'], $d['ownerId'], $d['offererId'], $d['giftId'], $d['created'], $d['accepted']);
    }
    
    function deserializeUser($json)
    {
        $d = json_decode($json, true);
        
        return new User($d['id'], $d['email'], $d['password'], $d['fullName'], $d['address'], $d['phone'], $d['created'], $d['userTypeId']);
    }
    
    $supported_methods=array('get','post', 'put', 'delete');

	$method=strtolower($_SERVER['REQUEST_METHOD']);

    if(!in_array($method, $supported_methods)){
        $status="405";
		
        $error_description=array(
			"message"=>"Method Not Allowed"
        );
		
        $data=json_encode($error_description);
    }
	
    if(isset($_SERVER['PATH_INFO'])){
        $url_elements=explode("/", $_SERVER['PATH_INFO']);
        $number_of_url_elements=count($url_elements)-1;
    }

    $status=0;
    $data="";

    try{
        $db=new DB();

        switch($method){
            case 'get':
               
                if($number_of_url_elements==1 and $url_elements[1]=='category'){
                    
                    $data=$db->readCategories();
                    
                    $status=200;
                }
                //test temp
                else if($number_of_url_elements==1 and $url_elements[1]=='user'){
                    $id;
                    foreach($_GET as $key => $value) {
                        if($key=="id"){
                            $id = $value;
                        }
                    }

                    $data=$db->readUser($id);

                    $status=200;
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='user' and $url_elements[3]=='id'){
                    $id = $url_elements[3];

                    $data=$db->readUser($id);
                    
                    $status=200;
                }
                else if($number_of_url_elements==1 and $url_elements[1]=='gift'){
                    $id;
                    $ownerId;
                    foreach($_GET as $key => $value) {
                        if($key=="id"){
                            $id = $value;
                            $data=$db->readGift($id);
                        }else if($key=="ownerId"){
                            $ownerId = $value;
                            $data=$db->readGiftsForOwner($ownerId);
                        }
                    }

                    $status=200;
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[2]=='id'){
                    
                    $id = $url_elements[3];
                    
                    $data=$db->readGift($id);
                    
                    $status=200;
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[2]=='ownerId'){
                    
                    $ownerId = $url_elements[3];
                    
                    $data=$db->readGiftsForOwner($ownerId);
                    
                    $status=200;
                }
                else if($number_of_url_elements==1 and $url_elements[1]=='offer'){
                    
                    $ownerId;
                    foreach($_GET as $key => $value) {
                        if($key=="ownerId"){
                            $ownerId = $value;
                        }
                    }
                    
                    $data=$db->readOffersForOwner($ownerId);
                    
                    $status=200;
                }
                else if($number_of_url_elements==5 and $url_elements[1]=='gift' and $url_elements[2]=='ownerId' and $url_elements[4]=='searchTerm'){
                    
                    $ownerId = $url_elements[3];
                    $searchTerm = $url_elements[5];
                    
                    $data=$db->readGiftsBySearchTerm($ownerId, $searchTerm);
                    
                    $status=200;
                }
                else if($number_of_url_elements==5 and $url_elements[1]=='gift' and $url_elements[2]=='ownerId' and $url_elements[4]=='categoryId'){
                    
                    $ownerId = $url_elements[3];
                    $categoryId = $url_elements[5];
                    
                    $data=$db->readGiftsForCategory($ownerId, $categoryId);
                    
                    $status=200;
                }
                break;
                
                
            case 'post':
                //temp register api
                if($number_of_url_elements==1 and $url_elements[1]=='user'){
                            
                            $json = file_get_contents('php://input');
                            $user = deserializeUser($json);
                            $createdUser = $db->createUser($user);

                            $data = $createdUser->toJSON();

                            $status=201;
                }
				else if($number_of_url_elements==1 and $url_elements[1]=='gift'){
                    
                    $json = file_get_contents('php://input');
                    
                    $gift = deserializeGift($json);
                    $createdGift = $db->createGift($gift);

                    $data = $createdGift->toJSON();
                    
                    $status=201;
                }
                else if($number_of_url_elements==1 and $url_elements[1]=='offer'){
                    
                    $json = file_get_contents('php://input');
                    
                    $offer = deserializeOffer($json);
                    
                    $createdOffer = $db->createOffer($offer);
                    
                    $data = $createdOffer->toJSON();
                    
                    $status=201;
                }
                break;
                
                
            case 'put':
                //temp login url
                if($number_of_url_elements==1 and $url_elements[1]=='login'){
                        
                        $json = file_get_contents('php://input');
                        
                        $data = $json;

                        $status=200;
                }
				else if($number_of_url_elements==3 and $url_elements[1]=='offer' and $url_elements[2]=='id'){
                    
                    $offerId = $url_elements[3];
                    
                    $json = file_get_contents('php://input');
                    
                    $offer = deserializeOffer($json);
                    
                    $updatedOffer = $db->updateOffer($offerId, $offer);
                    
                    $data = $updatedOffer->toJSON();
                    
                    $status=200;
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='user' and $url_elements[2]=='id'){
                    
                    $userId = $url_elements[3];
                    
                    $json = file_get_contents('php://input');
                    
                    $user = deserializeUser($json);
                    
                    $updatedUser = $db->updateUser($userId, $user);
                    
                    $data = $updatedUser->toJSON();
                    
                    $status=200;
                } 
                else if($number_of_url_elements==1 and $url_elements[1]=='user'){

                    $json = file_get_contents('php://input');
                    
                    $user = deserializeUser($json);
                    
                    $updatedUser = $db->updateUser($user->id, $user);
                    
                    $data = $updatedUser->toJSON();
                    
                    $status=200;
                }
                
                break;

                
            case 'delete':
                if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[2]=='id'){
                    
                    $giftId = $url_elements[3];
                    
                    $db->deleteGift($giftId);
                    
                    $data = "";
                    
                    $status=200;
                }
				
                break;
        }


    }catch(Exception $e){
            $status="500";

            $error_description=array(
                "message"=>$e->getMessage()
            );

            $data=json_encode($error_description);
    }
    
    header("HTTP/1.1 ".$status);
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Method: GET, POST, PUT, DELETE");
    if(isset($data))
        echo $data;
    
?>