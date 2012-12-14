<?php

    // configuration
    require("config.php"); 

    define("LENGTH", 294);

    for ($i = 1; $i <= LENGTH; $i++) {
        $deptname = query("SELECT DEPT_NAME FROM depts WHERE DEPT_ID = (SELECT DEPT_NAME FROM profs WHERE PROF_ID =?)", $i); 
        query("UPDATE profs SET DEPT_NAME = ? WHERE PROF_ID = ?", $deptname[0]["DEPT_NAME"], $i);
    }
?>