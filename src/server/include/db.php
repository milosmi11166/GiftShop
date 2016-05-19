<?php
	class DB{
		public static $connection;
		
		
		public function __construct(){
			if(!isset(self::$connection))
				self::$connection=new PDO('mysql:host=localhost;dbname=GiftShop', 'root', '', array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION));
		}
		
		public function __destruct(){
			self::$connection=null;
		}
		
		public function readAllGifts(){

            $query="select * from gift";

            $stmt=self::$connection->query($query);

			if (($result = $stmt->fetchAll(PDO::FETCH_ASSOC)) != null) 
				return $result;
			 else
				return null;
		}
	}
?>