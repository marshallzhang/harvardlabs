<?php

    // configuration
    require("config.php"); 

    $file = fopen("fstags.txt","r") or exit("Unable to open file!");

    while (!feof($file)) {
        $current = fgets($file);
        query("INSERT INTO tags (TAG_NAME) VALUES (?)", $current);
    }    

?>