<?php    

    // require("../includes/config.php"); 
    if(!empty($_GET)) {
        search();
    }


    function search() {

        $con = mysql_connect('mysql.hcs.harvard.edu','harvardlabs', 'nUseIa9d8cVR');
        mysql_select_db('harvardlabs', $con);

        $q = mysql_real_escape_string($_GET['q'], $con);

        $sql = mysql_query("
            SELECT
                PROF_NAME,
                DEPT_NAME,
                GROUP_CONCAT(tags.TAG_NAME SEPARATOR ', ') AS TAGS
            FROM prof_tag_link
            JOIN profs ON profs.PROF_ID = prof_tag_link.PROF_ID
            JOIN tags ON tags.TAG_ID = prof_tag_link.TAG_ID
            WHERE PROF_NAME IN (
                SELECT profs.PROF_NAME
                FROM prof_tag_link
                JOIN profs ON profs.PROF_ID = prof_tag_link.PROF_ID
                JOIN tags ON tags.TAG_ID = prof_tag_link.TAG_ID
                WHERE (
                    PROF_NAME LIKE '%{$q}%' OR
                    TAG_NAME LIKE '%{$q}%' OR
                    DEPT_NAME LIKE '%{$q}%'
                )
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