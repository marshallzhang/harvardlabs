<?php    

    // require("../includes/config.php"); 
    labrequest();

    function labrequest() {

        $con = mysql_connect('mysql.hcs.harvard.edu','harvardlabs', 'nUseIa9d8cVR');
        mysql_select_db('harvardlabs', $con);

        $info = mysql_real_escape_string($_GET['info'],$con);

        $sql = mysql_query("
            SELECT
                TAG_NAME
            FROM prof_tag_link
            JOIN profs ON profs.PROF_ID = prof_tag_link.PROF_ID
            JOIN tags ON tags.TAG_ID = prof_tag_link.TAG_ID
            WHERE PROF_NAME LIKE '%{$info}%'
        ");            

        //Create an array with the results
        $results=array();
        while($v = mysql_fetch_object($sql)){
            $results[] = array(
              'tags'=>$v->TAG_NAME
            );
        }
        //using JSON to encode the array
        echo json_encode($results);
    }
?>