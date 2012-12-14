<?php

    // configuration
    require("config.php"); 

    $profs = fopen("sprofs.txt","r") or exit("Unable to open file!");
    $sites = fopen("semails.txt","r") or exit("Unable to open file!");

    while (!feof($profs)) {
        $prof = fgets($profs);
        $site = fgets($sites);
        query("INSERT INTO profs (PROF_NAME,PROF_SITE) VALUES (?,?)", $prof, $site);
    }    

?>