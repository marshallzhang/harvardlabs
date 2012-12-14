<?php    

    add();

    function add() {

        $con = mysql_connect('mysql.hcs.harvard.edu','harvardlabs', 'nUseIa9d8cVR');
        mysql_select_db('harvardlabs', $con);

        $name = mysql_real_escape_string($_GET['name'], $con);
        $cookie = $_COOKIE['cookie'];

        $sql = mysql_query("
            INSERT INTO
                users (COOKIE, PROF_NAME)
            VALUES ('".$cookie."','".$name."')
        ");
        
        //using JSON to encode the array
        echo json_encode(array($cookie,$name,$sql));
    }
?>