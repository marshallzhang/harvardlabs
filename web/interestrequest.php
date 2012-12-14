<?php    

    // require("../includes/config.php"); 
    interestrequest();

    function interestrequest() {

        $con = mysql_connect('mysql.hcs.harvard.edu','harvardlabs', 'nUseIa9d8cVR');
        mysql_select_db('harvardlabs', $con);

        $info = mysql_real_escape_string($_GET['info'],$con);

        $sql = mysql_query("
            SELECT
                PROF_INTERESTS
            FROM interests
            WHERE PROF_NAME = '".$info."'
        ");

        //Create an array with the results
        $results=array();
        while($v = mysql_fetch_object($sql)){
            $results[] = array(
              'interests'=>$v->PROF_INTERESTS,
              'success'=>"SUPNIGZ"
            );
        }
        //using JSON to encode the array
        echo json_encode($results);
    }
?>