<?php
    
	require_once('include/db.php');

	//include
	include('classes/Gift.php');
	
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
                if($number_of_url_elements==1 and $url_elements[1]=='gift'){
                    $gifts=$db->readAllGifts();
                    
                    $status=200;
					$data=json_encode($gifts);
                }
                
                break;
            case 'post':
                
				//post requests here
				
                break;

            case 'put':
                
				//put requests here
				
                break;

            case 'delete':
                
				//delete requests here
				
                break;
        }


    }catch(Exception $e){
            $status="500";

            $error_description=array(
                "message"=>"Internal server error"
            );

            $data=json_encode($error_description);
    }
    
    header("HTTP/1.1 ".$status);
    header("Content-Type: application/json");
    if(isset($data))
        echo $data;
    
?>