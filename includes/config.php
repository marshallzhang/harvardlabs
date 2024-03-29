<?php

    /***********************************************************************
     * config.php
     *
     * Computer Science 50
     * Problem Set 7
     *
     * Configures pages.
     **********************************************************************/

    // display errors, warnings, and notices
    ini_set("display_errors", true);
    error_reporting(E_ALL);

    // requirements
    require("constants.php");
    require("functions.php");

    // enable sessions
    session_start();

    $hash = crypt(time());
    
    // enable cookie
    // setcookie('cookie',$hash); 

    $cookie_expire = time() + (86400 * '7');
    $domain = $_SERVER["HTTP_HOST"];

    if (empty($_COOKIE['cookie'])){
    setcookie('cookie', $hash , $cookie_expire , '/', $domain  , FALSE, TRUE);
    }   

?>
