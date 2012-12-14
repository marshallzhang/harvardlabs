<?php

    // configuration
    require("config.php"); 

    define("LENGTH", 6);

    class Lab {
    	public $dept;
    	public $name;
    	public $tags;
    	public $site;
    }

    $data = fopen("profsandtags.csv","r");

    if (is_null($data)) {
    	return false;
    }

    while (!feof($data)) {

    	// getting the data from line on csv file
    	$temp = fgets($data);
    	$line = substr($temp,1,-2);
    	list($department,$profname,$labtagstemp,$labsite) = (explode('","',$line));

    	// making lab object
    	$lab = new Lab();
    	$lab->dept = $department;
    	$lab->name = $profname;
    	$lab->tags = explode("|",$labtagstemp);
    	$lab->site = $labsite;

    	// find number for dept
    	$deptnum = query("SELECT DEPT_ID FROM depts WHERE DEPT_NAME = ?",$lab->dept);
    	$number = $deptnum[0]["DEPT_ID"];

  //   	// add prof tag links
  //   	for ($i = 1; $i <= LENGTH; $i++) {
		// 	$name = query("SELECT TAG_NAME FROM tags WHERE TAG_ID = ?", $i);
  //           $lab->tags = array_map('trim', $lab->tags);
		// 	if (in_array(trim($name[0]["TAG_NAME"]),$lab->tags)) {
		// 		$profid = query("SELECT PROF_ID FROM profs WHERE PROF_NAME =?", $lab->name);
		// 		query("INSERT INTO prof_tag_link (PROF_ID,TAG_ID) VALUES (?,?)",$profid[0]["PROF_ID"],$i);
		// 	}
		// }	

        // add prof dept links
        for ($i = 1; $i <= LENGTH; $i++) {
            $name = query("SELECT DEPT_NAME FROM depts WHERE DEPT_ID = ?", $i);
            $lab->dept = trim($lab->dept);
            echo $lab->dept;
            echo $name[0]['DEPT_NAME'];
            if (trim($name[0]['DEPT_NAME']) == $lab->dept) {
                $profid = query("SELECT PROF_ID FROM profs WHERE PROF_NAME =?", $lab->name);
                query("INSERT INTO prof_dept_link (PROF_ID,DEPT_ID) VALUES (?,?)",$profid[0]["PROF_ID"],$i);
            }
        }   

    } 
?>