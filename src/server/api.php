<?php
    
	require_once('include/db.php');
	require_once('vendor/firebase/php-jwt/Authentication/JWT.php');
	require_once('vendor/firebase/php-jwt/Exceptions/ExpiredException.php');
	require_once('vendor/firebase/php-jwt/Exceptions/BeforeValidException.php');


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
        
        return new Offer($d['ownerId'], $d['offererId'], $d['giftId'], $d['accepted'],$d['comment']);
    }
    
    function deserializeUser($json)
    {
        $d = json_decode($json, true);
        
        return new User($d['id'], $d['email'], $d['password'], $d['fullName'], $d['address'], $d['phone'], $d['created'], $d['userTypeId']);
    }

    function buildJWTToken($userId, $username)
    {
        $tokenId    = base64_encode(mcrypt_create_iv(32));
        $issuedAt   = time();
        $notBefore  = $issuedAt + 10;             //Adding 10 seconds
        $expire     = $notBefore + 60;            // Adding 60 seconds
        $serverName = $_SERVER['SERVER_NAME']; // Retrieve the server name from config file

        /*
         * Create the token as an array
         */
        $data = [
            'iat'  => $issuedAt,         // Issued at: time when the token was generated
            'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
            'iss'  => $serverName,       // Issuer
            'nbf'  => $notBefore,        // Not before
            'exp'  => $expire,           // Expire
            'data' => [                  // Data related to the signer user
                'userId'   => $userId, // userid from the users table
                'userName' => $username, // User name
            ]
        ];
        return $data;
    }

    function authorizeUser(){
        $headers = apache_request_headers();
        $authHeader = null;
        $token;

        foreach ($headers as $header => $value) {
            if($header == 'Authorization'){
                $authHeader = $value;
            }
        }

        if ($authHeader != null) {
            list($jwt) = sscanf( $authHeader, 'Bearer %s');

        if ($jwt) {
            try {

                /*
                 * TODO: decode the jwt using the key from config
                 */
                $secretKey = '92702689';
               // echo $jwt;
                $token = JWT::decode($jwt, $secretKey, array('HS512'));
                return $token;

            } catch (Exception $e) {
                /*
                 * the token was not able to be decoded.
                 * this is likely because the signature was not able to be verified (tampered token)
                 */
                $status = 401;
                header('HTTP/1.0 401 Unauthorized');
                echo 'The token was not able to be decoded.';
                return false;
            }
        } else {
            /*
             * No token was able to be extracted from the authorization header
             */
            $status = 400;
            header('HTTP/1.0 400 Bad Request');
            echo 'No token was able to be extracted from the authorization header';
                return false;
        }
    } else {
        /*
         * The request lacks the authorization token
         */
            header('HTTP/1.0 400 Bad Request');
            $status = 400;
            echo 'Token not found in request';
            return false;

        }
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
                //Allow anonymous
                if($number_of_url_elements==1 and $url_elements[1]=='category'){
                    
                    $data=$db->readCategories();
                    
					if($data != NULL){
                        $status=200;
                    }else{
                        $data = json_encode(array("message"=>"Internal server error"));
                        $status = 500;
                    }
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='user' and $url_elements[2]=='id'){
                    if(authorizeUser() != null){
						$id = $url_elements[3];

						$data=$db->readUser($id);
                    
						if($data != NULL){
							$status=200;
						}else{
							$data = json_encode(array("message"=>"Not found"));
							$status = 404;
						}
                    }else{
                        $status = 401;
                    }
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[2]=='id'){
                    
                    if(authorizeUser() != null){
                        $id = $url_elements[3];

                        $data=$db->readGift($id);

                        if($data != NULL){
							$status=200;
						}else{
							$data = json_encode(array("message"=>"Not found"));
							$status = 404;
						}
                    }else{
                            $status = 401;
                    }
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[2]=='ownerId'){
                    
                    if(authorizeUser() != null){
                        $ownerId = $url_elements[3];

                        $data=$db->readGiftsForOwner($ownerId);

                        if($data != NULL){
							$status=200;
						}else{
							$data = json_encode(array("message"=>"Internal server error"));
							$status = 500;
						}
                    }else{
                        $status = 401;
                    }
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='offer' and $url_elements[2]=='ownerId'){
                    if(authorizeUser() != null){
                        $ownerId = $url_elements[3];

                        $data=$db->readOffersForOwner($ownerId);

                        if($data != NULL){
							$status=200;
						}else{
							$data = json_encode(array("message"=>"Internal server error"));
							$status = 500;
						}
                     }else{
                        $status = 401;
                     }   
                }
                //Allow anonymous
                else if($number_of_url_elements==5 and $url_elements[1]=='gift' and $url_elements[2]=='ownerId' and $url_elements[4]=='searchTerm'){
                    
                    $ownerId = $url_elements[3];
                    $searchTerm = $url_elements[5];
                    
                    $data=$db->readGiftsBySearchTerm($ownerId, $searchTerm);
                    
                    $status=200;
                }
                //Allow anonymous
                else if($number_of_url_elements==5 and $url_elements[1]=='gift' and $url_elements[2]=='ownerId' and $url_elements[4]=='categoryId'){
                    
                    $ownerId = $url_elements[3];
                    $categoryId = $url_elements[5];
                    
                    $data=$db->readGiftsForCategory($ownerId, $categoryId);
                    
                    if($data != NULL){
                        $status=200;
                    }else{
                        $data = json_encode(array("message"=>"Internal server error"));
                        $status = 500;
                    }
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[3]=='offers'){
                    
                    if(authorizeUser() != null){
                        $giftId = $url_elements[2];

                        $data=$db->readOffersForGift($giftId);

                        if($data != NULL){
							$status=200;
						}else{
							$data = json_encode(array("message"=>"Internal server error"));
							$status = 500;
						}
                     }else{
                        $status = 401;
                     }   
                }
                break;
                
                
            case 'post':
            //Allow anonymous
              if($number_of_url_elements==2 and $url_elements[1]=='user' and $url_elements[2]=='register'){
                            
                        $json = file_get_contents('php://input');
                        $user = deserializeUser($json);
                        $createdUser = $db->createUser($user);

                        $data = $createdUser->toJSON();

                        if($data != NULL){
                            $status=201;
                        }else{
                            $data = json_encode(array("message"=>"Internal server error"));
                            $status = 500;
                        }
              }
              //Allow anonymous
               else if($number_of_url_elements==2 and $url_elements[1]=='user' and $url_elements[2]=='login'){
                            
                        $json = file_get_contents('php://input');
                        $d = json_decode($json, true);
                        $tempData=$db->readUserLogin($d['username'], $d['password']);  
                                
                        if($tempData != NULL){
                            $token = buildJWTToken($tempData->Id, $tempData->Email);

                            $tempKey = base64_encode(openssl_random_pseudo_bytes(64));
                            $secretKey = '92702689';//base64_decode($tempKey);
    
                            /*
                             * Encode the array to a JWT string.
                             * Second parameter is the key to encode the token.
                             * 
                             * The output string can be validated at http://jwt.io/
                             */
                            $jwt = JWT::encode(
                                $token,      //Data to be encoded in the JWT
                                $secretKey, // The signing key
                                'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
                                );

                            $unencodedArray = ['jwt' => $jwt];
                            //header("Authorisation".$unencodedArray->jwt);
                            //json_encode($unencodedArray);
                            $tempData->jwt = $unencodedArray['jwt'];
                            $data = json_encode($tempData);
                            $status=200;
                        }else{
                            $status=404;
                        }
               }
               else if($number_of_url_elements==1 and $url_elements[1]=='gift'){

                    if(authorizeUser() != null){
                        $json = file_get_contents('php://input');

                        $gift = deserializeGift($json);
                        $createdGift = $db->createGift($gift);

                        $data = $createdGift->toJSON();

                        if($data != NULL){
                            $status=201;
                        }else{
                            $data = json_encode(array("message"=>"Internal server error"));
                            $status = 500;
                        }
                     }else{
                        $status = 401;
                     }   
                }
                else if($number_of_url_elements==1 and $url_elements[1]=='offer'){
                    
                    if(authorizeUser() != null){
                        $json = file_get_contents('php://input');

                        $offer = deserializeOffer($json);

                        $createdOffer = $db->createOffer($offer);

                        $data = $createdOffer->toJSON();

                        if($data != NULL){
                            $status=201;
                        }else{
                            $data = json_encode(array("message"=>"Internal server error"));
                            $status = 500;
                        }
                    }else{
                        $status = 401;
                     }  
                }
                else if($number_of_url_elements==5 and $url_elements[1]=='image' and $url_elements[2]=='giftId' and $url_elements[4]=='imageNumber'){
                    
                    if(authorizeUser() != null){
                        $giftId = $url_elements[3];
                        $imageNumber = $url_elements[5];

                        $filePath = "../img/" . basename($_FILES['file']['name']);

                        move_uploaded_file($_FILES['file']['tmp_name'], $filePath);

                        $db->updateGiftSetImagePath($giftId, $imageNumber,"img/" . $_FILES['file']['name']);

                        $status = 200;
                     }else{
                        $status = 401;
                     }  
                }
                break;
                
                
            case 'put':
                if($number_of_url_elements==3 and $url_elements[1]=='offer' and $url_elements[2]=='id'){
                    
                    if(authorizeUser() != null) {
                        $offerId = $url_elements[3];

                        $json = file_get_contents('php://input');

                        $offer = deserializeOffer($json);

                        $updatedOffer = $db->updateOffer($offerId, $offer);

                        $data = $updatedOffer->toJSON();

                        if($data != NULL){
                            $status=200;
                        }else{
                            $data = json_encode(array("message"=>"Bad uri"));
                            $status = 400;
                        }
                    }else{
                        $status = 401;
                    }  
                }
                else if($number_of_url_elements==3 and $url_elements[1]=='user' and $url_elements[2]=='id'){
                    if(authorizeUser() != null) {
                        $userId = $url_elements[3];

                        $json = file_get_contents('php://input');

                        $user = deserializeUser($json);

                        $updatedUser = $db->updateUser($userId, $user);

                        $data = $updatedUser->toJSON();

                        if($data != NULL){
                            $status=200;
                        }else{
                            $data = json_encode(array("message"=>"Bad uri"));
                            $status = 400;
                        }
                    }else{
                        $status = 401;
                    } 
                } 
                else if($number_of_url_elements==1 and $url_elements[1]=='user'){

                    if(authorizeUser() != null) {
                        $json = file_get_contents('php://input');

                        $user = deserializeUser($json);

                        $updatedUser = $db->updateUser($user->id, $user);

                        $data = $updatedUser->toJSON();

                        if($data != NULL){
                            $status=200;
                        }else{
                            $data = json_encode(array("message"=>"Bad uri"));
                            $status = 400;
                        }
                    }else{
                        $status = 401;
                    } 
                }
                
                break;

                
            case 'delete':
                if($number_of_url_elements==3 and $url_elements[1]=='gift' and $url_elements[2]=='id'){
                    
                    if(authorizeUser() != null) {
                        $giftId = $url_elements[3];

                        $db->deleteGift($giftId);

                        $data = "";

                        if($data != NULL){
							$status=200;
						}else{
							$data = json_encode(array("message"=>"Not found"));
							$status = 404;
						}
                    }else{
                        $status = 401;
                    } 
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
    header('Access-Control-Allow-Headers: Authorization');

    if(isset($data))
        echo $data;
?>