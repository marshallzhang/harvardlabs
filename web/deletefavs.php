<?php    

    // require("../includes/config.php"); 
    deletefavs();


    function deletefavs() {

        $con = mysql_connect('mysql.hcs.harvard.edu','harvardlabs', 'nUseIa9d8cVR');
        mysql_select_db('harvardlabs', $con);

        $name = mysql_real_escape_string($_GET['name'], $con);
        $cookie = $_COOKIE['cookie'];

        $delete = mysql_query("
            DELETE FROM
                users
            WHERE COOKIE='".$cookie."'AND PROF_NAME='".$name."'
        ");

        $sql = mysql_query("
            SELECT
                PROF_NAME,
                DEPT_NAME,
                PROF_SITE
            FROM prof_tag_link
            JOIN profs ON profs.PROF_ID = prof_tag_link.PROF_ID
            JOIN tags ON tags.TAG_ID = prof_tag_link.TAG_ID
            WHERE PROF_NAME IN (
                SELECT PROF_NAME
                FROM users
                WHERE COOKIE ='".$cookie."' 
            )
            GROUP BY PROF_NAME
        ");            

        //Create an array with the results
        $results=array();
        while($v = mysql_fetch_object($sql)){
            $results[] = array(
              'name'=>$v->PROF_NAME,
              'tags'=>$v->TAGS,
              'dept'=>$v->DEPT_NAME
            );
        }

        //using JSON to encode the array
        echo json_encode($results);
    }
?>