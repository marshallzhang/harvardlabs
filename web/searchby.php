<?php    

    // require("../includes/config.php"); 
    searchby();

    function searchby() {

        $con = mysql_connect('mysql.hcs.harvard.edu','harvardlabs', 'nUseIa9d8cVR');
        mysql_select_db('harvardlabs', $con);

        $q = mysql_real_escape_string($_GET['q'],$con);

        if ($q == "depts") {
            $sql = mysql_query("
               SELECT DISTINCT
                   DEPT_NAME AS NAME
               FROM prof_tag_link
               JOIN profs ON profs.PROF_ID = prof_tag_link.PROF_ID
               JOIN tags ON tags.TAG_ID = prof_tag_link.TAG_ID
               ORDER BY DEPT_NAME
            ");  
        }

        else if ($q == "tags") {
            $sql = mysql_query("
               SELECT DISTINCT
                   TAG_NAME AS NAME
               FROM prof_tag_link
               JOIN profs ON profs.PROF_ID = prof_tag_link.PROF_ID
               JOIN tags ON tags.TAG_ID = prof_tag_link.TAG_ID
               ORDER BY TAG_NAME
            ");  
        }

        //Create an array with the results
        $results=array();
        while($v = mysql_fetch_object($sql)){
            $results[] = array(
              'name'=>$v->NAME,
              'type'=>$q
            );
        }
        //using JSON to encode the array
        echo json_encode($results);
    }
?>