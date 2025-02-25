<?php
namespace Tualo\Office\EANSearch\Routes;
use Tualo\Office\Basic\TualoApplication;
use Tualo\Office\Basic\Route;
use Tualo\Office\Basic\IRoute;
use Tualo\Office\EANSearch\API;


class Base implements IRoute{
    public static function register(){

        Route::add('/eansearch/(?P<ean>[0-9]+)',function($matches){
            TualoApplication::contenttype('application/json');
            try{
                $result = API::query(
                    $matches['ean']
                );

                TualoApplication::result('time',time() );
                TualoApplication::result('data',$result );
                TualoApplication::result('success',true );

            }catch(\Exception $e){
                TualoApplication::result('msg', $e->getMessage());
            }
        },array('get','post'),true);
    }
}

        /*
Route::add('/eansearch/(?P<ean>[0-9]+)',function($matches){

    $db = TualoApplication::get('session')->getDB();
    $ean = $matches['ean'];
    $session = TualoApplication::get('session');
    try {

        if(!defined("EAN_SEARCH_API_TOKEN")){
            throw new Exception("Die API steht derzeit nicht zur Verfügung (TOKEN)");
        }else{
            // http://opengtindb.org/?ean=[ean]&cmd=query&queryid=[userid]

            $url = "https://api.ean-search.org/api?token=".EAN_SEARCH_API_TOKEN."&op=barcode-lookup&format=json&ean=".$ean;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HEADER, FALSE);
            curl_setopt($ch, CURLOPT_NOBODY, FALSE); // remove body
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            $data = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            if ($httpCode){
                TualoApplication::result('debug_response',$data);

                $json = json_decode($data,true);
                if (is_null($json)) throw new Exception("Die API steht derzeit nicht zur Verfügung (JSON Error)");
                if (!is_array($json)) throw new Exception("Die API steht derzeit nicht zur Verfügung (JSON not an Array)");
                if (count($json)>0){
                    if (isset($json[0]['error'])) throw new Exception($json[0]['error']);
                    if (!isset($json[0]['name'])) throw new Exception("Das Produkt wurde nicht gefunden");

                    TualoApplication::result('success',true);
                    TualoApplication::result('ean',$json[0]['ean']);
                    TualoApplication::result('name',$json[0]['name']);
                    

                }

            }else{
                throw new Exception("Die API steht derzeit nicht zur Verfügung (".$httpCode.")");
            }

        }


    }catch(Exception $e){
        TualoApplication::result('msg', $e->getMessage());
    }
    TualoApplication::contenttype('application/json');

},array('get','post'),true);
*/