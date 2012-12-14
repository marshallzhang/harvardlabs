function showInstantResults(data, highlight){
   var resultHtml = '';
    $.each(data, function(i,item){
        resultHtml+='<div class="result unselected" id="'+item.name+'">';
        resultHtml+='<div class="namedept-container"><div class="profname">'+item.name+'</div>';
        resultHtml+='<div class="profdept">'+item.dept+'</div></div>';
        resultHtml+='<div class="ellipsis proftags">'+item.tags+'</div>';
        resultHtml+='</div>';
    });

    $('div#results').html(resultHtml);
    $(function(){
        $("#results-container").jScrollPane({
            horizontalDragMaxWidth: 0,
            hideFocus:true
        });
    });

    $(function()
    {
     
        var bars = '.jspVerticalBar';
     
        $('#results-container').bind('jsp-initialised', function (event, isScrollable) {
             
            //hide the scroll bar on first load
            $(this).find(bars).hide();
         
        }).jScrollPane({hideFocus:true}).hover(
         
            //hide show scrollbar
            function () {
                $(this).find(bars).stop().fadeTo('fast', 0.9);
            },
            function () {
                $(this).find(bars).stop().fadeTo('fast', 0);
            }
     
        );              
     
    });        


    // SELECTING A LAB FROM INSTANT SEARCH


    // make mouse pointer
    $('div#results').on({
        mouseenter: function(){
            $(this).css("cursor","pointer");
        },
        mouseleave:function(){
            $(this).css("cursor","default");
        }            
    });

    // hover animation
    $("div.result.unselected").hover(
        function(){
            console.log("hovering bitches");
            $(this).animate({opacity:.9},100);
        },
        function(){
            $(this).animate({opacity:.6},{duration: 100,complete: function(){
                $(this).css('opacity','');
            }});
        }
    );

    // when lab is clicked
    $("div.result").on("click",
        function(){
            $("div.result").removeClass("selected");
            $("div.result").addClass("unselected");
            $(this).removeClass("unselected");
            $(this).addClass("selected");

            // fading
            var div_id = $(this).attr("id");
            $('#info-container').fadeOut(
                200, 
                function(){
                    var discover = '<p class="bigdiscover">Discover.</p><p class="proftitle">'+div_id+'</p>'+'<div class="add" id="'+div_id+'">Add to Favorites</div>';
                    $('#bigname').html(discover);
                    // get tags
                    var labrequest;
                    var $info = div_id;
                    labrequest = $.getJSON('labrequest.php',
                        {info:$info},
                        function(data){
                            showtagResults(data,$info);
                        }
                    );

                    var interestrequest;
                    console.log("is it working??");
                    interestrequest = $.getJSON('interestrequest.php',
                        {info:div_id},
                        function(data){
                            console.log(data);
                            showInterests(data,div_id);
                        }
                    );

                    // $(function(){
                    //     console.log("LOOK MA A SCROLL");
                    //     $('#info-container').jScrollPane({hideFocus:true});
                    // });

                    // $(function()
                    // {
                     
                    //     var bars = '.jspVerticalBar';
                     
                    //     $('#info-container').bind('jsp-initialised', function (event, isScrollable) {
                             
                    //         //hide the scroll bar on first load
                    //         $(this).find(bars).hide();
                         
                    //     }).jScrollPane({hideFocus:true}).hover(
                         
                    //         //hide show scrollbar
                    //         function () {
                    //             $(this).find(bars).stop().fadeTo('fast', 0.9);
                    //         },
                    //         function () {
                    //             $(this).find(bars).stop().fadeTo('fast', 0);
                    //         }
                     
                    //     );              
                     
                    // }); 

                    function showInterests(data, highlight){
                        var labrequestHtml = '';
                        console.log("ples i ned dis");
                        $.each(
                            data,
                            function(i,item){
                                console.log(item.success);
                                labrequestHtml+='<p>'+item.interests+'</p>';
                            }
                        );
                        $('p#interests').html(labrequestHtml);
                    }


                    function showtagResults(data, highlight){
                        var labrequestHtml = '<p id="taglisttitle">Research Tags</p>';
                        $.each(
                            data,
                            function(i,item){
                                labrequestHtml+='<div class="searchbyoption" id="'+item.tags+'">'+item.tags+'</div>';
                            }
                        );
                        $('div#tag-list').html(labrequestHtml);


                        // SEARCHING A TAG FROM DETAILED INFO


                        // hover over table
                        $("div#tag-list").hover(
                            function(){
                                $(this).css('cursor','pointer');
                            },
                            function(){
                                $(this).css('cursor','default');
                            }
                        );

                        // search tag when clicked
                        $("#tag-list > .searchbyoption").on(
                            {
                                click: function(){
                                    var tagrequest;
                                    var $tag = $(this).attr("id");
                                    labrequest = $.getJSON('search.php',
                                        {q:$tag},
                                        function(data){
                                            showInstantResults(data,$tag);
                                        }
                                    );
                                },

                                mouseenter: function(){
                                    $(this).animate({opacity:1},100);
                                },

                                mouseleave: function(){
                                    $(this).animate({opacity:.6},{duration: 100,complete: function(){
                                        $(this).css('opacity','');
                                    }});
                                }
                            }
                        ); 



                        // ADDING A LAB TO FAVORITES



                        $(".add").hover(
                            function(){
                                $(this).css('cursor','pointer');
                                $(this).animate({opacity:.9},100);
                            },
                            function(){
                                $(this).css('cursor','default');
                                $(this).animate({opacity:.6},{duration: 100,complete: function(){
                                    $(this).css('opacity','');
                                }});
                            }
                        );

                        $(".add").on(
                        {
                            click: function(){
                                var favrequest;
                                var dummy = "hi";
                                console.log(dummy);
                                var $name = $(this).attr("id");
                                favrequest = $.getJSON('getfavs.php',{
                                    name:$name
                                },function(data){          
                                    showResults(data,dummy); 
                                    console.log("THIS IS MY DAD"+data);
                                });


                                //Create HTML structure for the results and insert it on the result div
                                function showResults(data, highlight){
                                   var resultHtml = '';
                                    $.each(data, function(i,item){
                                        resultHtml+='<div class="favorite unselected" id="'+item.name+'">';
                                        resultHtml+='<div class="namedept-container"><div class="favprofname"><p class="favname">'+item.name+'</p><p class="remove" id="'+item.name+'">Remove</p></div>';
                                        resultHtml+='<div class="profdept">'+item.dept+'</div></div>';
                                        resultHtml+='<div class="sitelink">'+'<a href="'+item.site+'" target="_blank">Website</a></div>';
                                        resultHtml+='</div>';
                                    });

                                    $('div#favorites').html(resultHtml);
                                    $(function(){
                                        $("#connect-container").jScrollPane({
                                            horizontalDragMaxWidth: 0,
                                            hideFocus:true
                                        });
                                    });

                                    $(function()
                                    {
                                     
                                        var bars = '.jspVerticalBar';
                                     
                                        $('#connect-container').bind('jsp-initialised', function (event, isScrollable) {
                                             
                                            //hide the scroll bar on first load
                                            $(this).find(bars).hide();
                                         
                                        }).jScrollPane({hideFocus:true}).hover(
                                         
                                            //hide show scrollbar
                                            function () {
                                                $(this).find(bars).stop().fadeTo('fast', 0.9);
                                            },
                                            function () {
                                                $(this).find(bars).stop().fadeTo('fast', 0);
                                            }
                                     
                                        );              
                                     
                                    });        


                                    // SELECTING A LAB FROM FAVORITES LIST


                                    // make mouse pointer
                                    $('.favname, .remove').on({
                                        mouseenter: function(){
                                            $(this).css("cursor","pointer");
                                        },
                                        mouseleave:function(){
                                            $(this).css("cursor","default");
                                        }            
                                    });

                                    // hover animation
                                    $(".favname,.remove").hover(
                                        function(){
                                            $(this).animate({opacity:.9},100);
                                        },
                                        function(){
                                            $(this).animate({opacity:.6},{duration: 100,complete: function(){
                                                $(this).css('opacity','');
                                            }});
                                        }
                                    );

                                    $(".remove").on("click",
                                        function(){
                                            var deleterequest;
                                            var $name = $(this).attr("id");
                                            deleterequest = $.getJSON('deletefavs.php',{
                                                name:$name
                                            },function(data){          
                                                showResults(data,dummy); 
                                                console.log(data);
                                            });
                                        }
                                    );

                                    // when lab is clicked
                                    $("div.favorite").on("click",
                                        function(){
                                            $("div.favorite").removeClass("selected");
                                            $("div.favorite").addClass("unselected");
                                            $(this).addClass("unselected");
                                            $(this).addClass("selected");
                                            // fading
                                            var div_idfav = $(this).attr("id");
                                            console.log(div_idfav);
                                            $('#info-container').fadeOut(
                                                200, 
                                                function(){
                                                    var discover = '<p class="bigdiscover">Discover.</p><p class="proftitle">'+div_idfav+'</p>'+'<div class="add" id="'+div_idfav+'">Add to Favorites</div>';
                                                    $('#bigname').html(discover);
                                                    var interestrequest;
                                                    console.log("is it working??");
                                                    interestrequest = $.getJSON('interestrequest.php',
                                                        {info:div_idfav},
                                                        function(data){
                                                            showInterests(data,div_idfav);
                                                        }
                                                    );
                                                    // get tags
                                                    var labrequest;
                                                    var $infofav = div_idfav;
                                                    labrequest = $.getJSON('labrequest.php',
                                                        {info:div_idfav},
                                                        function(data){
                                                            console.log(data);
                                                            showtagResults(data,div_idfav);
                                                        }
                                                    );


                                                    function showInterests(data, highlight){
                                                        var labrequestHtml = '';
                                                        console.log("ples i ned dis");
                                                        $.each(
                                                            data,
                                                            function(i,item){
                                                                labrequestHtml+='<p>'+item.interests+'</p>';
                                                            }
                                                        );
                                                        $('p#interests').html(labrequestHtml);
                                                    }

                                                    function showtagResults(data, highlight){
                                                        var labrequestHtml = '<p id="taglisttitle">Research Tags</p>';
                                                        $.each(
                                                            data,
                                                            function(i,item){
                                                                labrequestHtml+='<div class="searchbyoption" id="'+item.tags+'">'+item.tags+'</div>';
                                                            }
                                                        );
                                                        $('div#tag-list').html(labrequestHtml);
                                                     

 
                                                        // SEARCHING A TAG FROM DETAILED INFO


                                                        // hover over table
                                                        $("table").hover(
                                                            function(){
                                                                $(this).css('cursor','pointer');
                                                            },
                                                            function(){
                                                                $(this).css('cursor','default');
                                                            }
                                                        );

                                                        // search tag when clicked
                                                        $("td.tags").on(
                                                            {
                                                                click: function(){
                                                                    var tagrequest;
                                                                    var $tag = $(this).attr("id");
                                                                    console.log("SUGNIGAAZZZZZZ");
                                                                    labrequest = $.getJSON('search.php',
                                                                        {q:$tag},
                                                                        function(data){
                                                                            console.log(data);
                                                                            showInstantResults(data,$tag);
                                                                        }
                                                                    );
                                                                },

                                                                mouseenter: function(){
                                                                    $(this).animate({backgroundColor: '#e6e6e6'},100);
                                                                },

                                                                mouseleave: function(){
                                                                    $(this).animate({backgroundColor: '#c1c1c1'},{duration: 100,complete: function(){
                                                                        $(this).css('opacity','');
                                                                    }});
                                                                }
                                                            }
                                                        ); 



                                                        // ADDING A LAB TO FAVORITES



                                                        $(".add").hover(
                                                            function(){
                                                                $(this).css('cursor','pointer');
                                                            },
                                                            function(){
                                                                $(this).css('cursor','default');
                                                            }
                                                        );

                                                        $(".add").on(
                                                        {
                                                            click: function(){
                                                                var addrequest;
                                                                var $name = $(this).attr("id");
                                                                addrequest = $.getJSON('add.php',
                                                                    {name:$name},
                                                                    function(data){
                                                                        console.log(data)
                                                                    }
                                                                );
                                                            }
                                                        });                           
                                                    }             
                                                }
                                            );



                                            $('#info-container').promise().done(function(){
                                                 $(this).fadeIn(
                                                    200,
                                                    function(){
                                                        //nothing
                                                    }
                                                )                   
                                            });
                                        }
                                    );
                                }


                                $('form').submit(function(e){
                                    e.preventDefault();
                                });



                            }
                        });                           
                    }  
                }
            );

            $('#info-container').promise().done(function(){
                 $(this).fadeIn(
                    200,
                    function(){
                        //nothing
                    }
                )                   
            });



        }
    );
}

$(function(){
    request = $.getJSON('getall.php',
        {q:"hi"},
        function(data){           
            showInstantResults(data,"hi");
        }
    );
});

$(function(){
    console.log("sup");
    var discover = '<p class="bigdiscover">Discover.</p><p class="prompt">Get started with a search.</p>';
    $('#bigname').html(discover);
});

var runningRequest = false;
var request;



// INSTANT SEARCH



//Identify the typing action
$('input#q').keyup(function(e){
    e.preventDefault();
    var $q = $(this);



    // IF NO INPUT



    if($q.val() == '')
    {
        request = $.getJSON('getall.php',{
                q:$q.val()
            },function(data){           
                showInstantResults(data,$q.val());
            }
        );
    }


    // IF INPUT


    //Abort opened requests to speed it up
    if(runningRequest){
        request.abort();
    }

    runningRequest=true;
    request = $.getJSON('search.php',{
        q:$q.val()
    },function(data){           
        showInstantResults(data,$q.val());
        runningRequest=false;
    });

    //Create HTML structure for the results and insert it on the result div


    $('form').submit(function(e){
        e.preventDefault();
    });
});

// INITIAL LOOKUP OF TAGS

$(function(){
    var $q = "tags";
    var byrequest;
    byrequest = $.getJSON('searchby.php',{
        q:$q
    },function(data){           
        showResults(data,$q);
    });

    //Create HTML structure for the results and insert it on the result div
    function showResults(data, highlight){
       var resultHtml = '';
        $.each(data, function(i,item){
            resultHtml+='<div class="searchbyoption" id="'+item.name+'">'+item.name+'</div>';
            searchtype = item.type;
        });

        $('div#options').html(resultHtml);

        // make mouse pointer
        $('div#options-container').on({
            mouseenter: function(){
                $(this).css("cursor","pointer");
            },
            mouseleave:function(){
                $(this).css("cursor","default");
            }            
        });

        $(function(){
            $("#searchby-container").jScrollPane({hideFocus:true});
        });

        $(function()
        {
         
            var bars = '.jspVerticalBar';
         
            $('#searchby-container').bind('jsp-initialised', function (event, isScrollable) {
                 
                //hide the scroll bar on first load
                $(this).find(bars).hide();
             
            }).jScrollPane({hideFocus:true}).hover(
             
                //hide show scrollbar
                function () {
                    $(this).find(bars).stop().fadeTo('fast', 0.9);
                },
                function () {
                    $(this).find(bars).stop().fadeTo('fast', 0);
                }
         
            );              
         
        }); 

        $("div.searchbyoption").hover(
            function(){
                $(this).animate({opacity:.9},100);
            },
            function(){
                $(this).animate({opacity:.6},{duration: 100,complete: function(){
                    $(this).css('opacity','');
                }});
            }
        )

        // SEARCH BY THE TAG OR DEPARTMENT

        $('div.searchbyoption').on(
            {
                click: function(){
                    console.log("SUPNIGGA");
                    var byrequest;
                    var $value = $(this).attr("id");
                    labrequest = $.getJSON('byrequest.php',
                        {q:$value,type:searchtype},
                        function(data){
                            showInstantResults(data,$value);
                        }
                    );
                }
            }
        );

    }

});

// SEARCH BY TAGS OR DEPARTMENTS


$('.searchoption').on({
    click: function(){
        var $q = $(this).attr("id");
        var byrequest;
        byrequest = $.getJSON('searchby.php',{
            q:$q
        },function(data){           
            showResults(data,$q);
        });

        //Create HTML structure for the results and insert it on the result div
        function showResults(data, highlight){
           var resultHtml = '';
            $.each(data, function(i,item){
                resultHtml+='<div class="searchbyoption" id="'+item.name+'">'+item.name+'</div>';
                searchtype = item.type;
            });

            $('div#options').html(resultHtml);

            // make mouse pointer
            $('div#options-container').on({
                mouseenter: function(){
                    $(this).css("cursor","pointer");
                },
                mouseleave:function(){
                    $(this).css("cursor","default");
                }            
            });

            $(function(){
                $("#searchby-container").jScrollPane({hideFocus:true});
            });

            $(function()
            {
             
                var bars = '.jspVerticalBar';
             
                $('#searchby-container').bind('jsp-initialised', function (event, isScrollable) {
                     
                    //hide the scroll bar on first load
                    $(this).find(bars).hide();
                 
                }).jScrollPane({hideFocus:true}).hover(
                 
                    //hide show scrollbar
                    function () {
                        $(this).find(bars).stop().fadeTo('fast', 0.9);
                    },
                    function () {
                        $(this).find(bars).stop().fadeTo('fast', 0);
                    }
             
                );              
             
            }); 

            $("div.searchbyoption").hover(
                function(){
                    $(this).animate({opacity:.9},100);
                },
                function(){
                    $(this).animate({opacity:.6},{duration: 100,complete: function(){
                        $(this).css('opacity','');
                    }});
                }
            )

            // SEARCH BY THE TAG OR DEPARTMENT

            $('div.searchbyoption').on(
                {
                    click: function(){
                        console.log("SUPNIGGA");
                        var byrequest;
                        var $value = $(this).attr("id");
                        labrequest = $.getJSON('byrequest.php',
                            {q:$value,type:searchtype},
                            function(data){
                                showInstantResults(data,$value);
                            }
                        );
                    }
                }
            );
        }
    },

    mouseenter:function(){
        $(this).animate({opacity:1},100);
    },

    mouseleave:function(){
        $(this).animate({opacity:.6},100);
    }

});

$('a.searchoption').hover(
    function(){
        $(this).css('cursor','pointer');
    },
    function(){
        $(this).css('pointer','default');
    }
);

$(function(){
    var favrequest;
    var dummy = "hi";
    console.log(dummy);
    var $name = $(this).attr("id");
    favrequest = $.getJSON('getfavs.php',{
        name:$name
    },function(data){          
        showResults(data,dummy); 
        console.log("THIS IS MY DAD"+data);
    });


    //Create HTML structure for the results and insert it on the result div
    function showResults(data, highlight){
       var resultHtml = '';
        $.each(data, function(i,item){
            resultHtml+='<div class="favorite unselected" id="'+item.name+'">';
            resultHtml+='<div class="namedept-container"><div class="favprofname"><p class="favname">'+item.name+'</p><p class="remove" id="'+item.name+'">Remove</p></div>';
            resultHtml+='<div class="profdept">'+item.dept+'</div></div>';
            resultHtml+='<div class="sitelink">'+'<a href="'+item.site+'" target="_blank">Website</a></div>';
            resultHtml+='</div>';
        });

        $('div#favorites').html(resultHtml);
        $(function(){
            $("#connect-container").jScrollPane({
                horizontalDragMaxWidth: 0,
                hideFocus:true
            });
        });

        $(function()
        {
         
            var bars = '.jspVerticalBar';
         
            $('#connect-container').bind('jsp-initialised', function (event, isScrollable) {
                 
                //hide the scroll bar on first load
                $(this).find(bars).hide();
             
            }).jScrollPane({hideFocus:true}).hover(
             
                //hide show scrollbar
                function () {
                    $(this).find(bars).stop().fadeTo('fast', 0.9);
                },
                function () {
                    $(this).find(bars).stop().fadeTo('fast', 0);
                }
         
            );              
         
        });        


        // SELECTING A LAB FROM FAVORITES LIST


        // make mouse pointer
        $('.favname, .remove').on({
            mouseenter: function(){
                $(this).css("cursor","pointer");
            },
            mouseleave:function(){
                $(this).css("cursor","default");
            }            
        });

        // hover animation
        $(".favname,.remove").hover(
            function(){
                $(this).animate({opacity:.9},100);
            },
            function(){
                $(this).animate({opacity:.6},{duration: 100,complete: function(){
                    $(this).css('opacity','');
                }});
            }
        );

        $(".remove").on("click",
            function(){
                var deleterequest;
                var $name = $(this).attr("id");
                deleterequest = $.getJSON('deletefavs.php',{
                    name:$name
                },function(data){          
                    showResults(data,dummy); 
                    console.log(data);
                });
            }
        );

        // when lab is clicked
        $("div.favorite").on("click",
            function(){
                $("div.favorite").removeClass("selected");
                $("div.favorite").addClass("unselected");
                $(this).addClass("unselected");
                $(this).addClass("selected");
                // fading
                var div_idfav = $(this).attr("id");
                console.log(div_idfav);
                $('#info-container').fadeOut(
                    200, 
                    function(){
                        var discover = '<p class="bigdiscover">Discover.</p><p class="proftitle">'+div_idfav+'</p>'+'<div class="add" id="'+div_idfav+'">Add to Favorites</div>';
                        $('#bigname').html(discover);
                        // get tags

                        var interestrequest;
                        console.log("is it working??");
                        interestrequest = $.getJSON('interestrequest.php',
                            {info:div_idfav},
                            function(data){
                                showInterests(data,div_idfav);
                            }
                        );

                        var labrequest;
                        var $infofav = div_idfav;
                        labrequest = $.getJSON('labrequest.php',
                            {info:div_idfav},
                            function(data){
                                console.log(data);
                                showtagResults(data,div_idfav);
                            }
                        );

                        // $(function(){
                        //     $('#info-container').jScrollPane({hideFocus:true});
                        //     console.log("LOOK MA A SCROLL 2");
                        // });

                        // $(function()
                        // {
                         
                        //     var bars = '.jspVerticalBar';
                         
                        //     $('#info-container').bind('jsp-initialised', function (event, isScrollable) {
                                 
                        //         //hide the scroll bar on first load
                        //         $(this).find(bars).hide();
                             
                        //     }).jScrollPane({hideFocus:true}).hover(
                             
                        //         //hide show scrollbar
                        //         function () {
                        //             $(this).find(bars).stop().fadeTo('fast', 0.9);
                        //         },
                        //         function () {
                        //             $(this).find(bars).stop().fadeTo('fast', 0);
                        //         }
                         
                        //     );              
                         
                        // }); 


                        function showInterests(data, highlight){
                            var labrequestHtml = '';
                            console.log("ples i ned dis");
                            $.each(
                                data,
                                function(i,item){
                                    labrequestHtml+='<p>'+item.interests+'</p>';
                                }
                            );
                            $('p#interests').html(labrequestHtml);
                        }

                        function showtagResults(data, highlight){
                            var labrequestHtml = '<p id="taglisttitle">Research Tags</p>';
                            $.each(
                                data,
                                function(i,item){
                                    labrequestHtml+='<div class="searchbyoption" id="'+item.tags+'">'+item.tags+'</div>';
                                }
                            );
                            $('div#tag-list').html(labrequestHtml);


                            // SEARCHING A TAG FROM DETAILED INFO


                            // hover over table
                            $("table").hover(
                                function(){
                                    $(this).css('cursor','pointer');
                                },
                                function(){
                                    $(this).css('cursor','default');
                                }
                            );

                            // search tag when clicked
                            $("td.tags").on(
                                {
                                    click: function(){
                                        var tagrequest;
                                        var $tag = $(this).attr("id");
                                        console.log("SUGNIGAAZZZZZZ");
                                        labrequest = $.getJSON('search.php',
                                            {q:$tag},
                                            function(data){
                                                console.log(data);
                                                showInstantResults(data,$tag);
                                            }
                                        );
                                    },

                                    mouseenter: function(){
                                        $(this).animate({backgroundColor: '#e6e6e6'},100);
                                    },

                                    mouseleave: function(){
                                        $(this).animate({backgroundColor: '#c1c1c1'},{duration: 100,complete: function(){
                                            $(this).css('opacity','');
                                        }});
                                    }
                                }
                            ); 



                            // ADDING A LAB TO FAVORITES



                            $(".add").hover(
                                function(){
                                    $(this).css('cursor','pointer');
                                },
                                function(){
                                    $(this).css('cursor','default');
                                }
                            );

                            $(".add").on(
                            {
                                click: function(){
                                    var addrequest;
                                    var $name = $(this).attr("id");
                                    addrequest = $.getJSON('add.php',
                                        {name:$name},
                                        function(data){
                                            console.log(data)
                                        }
                                    );
                                }
                            });                           
                        }             
                    }
                );


                $('#info-container').promise().done(function(){
                     $(this).fadeIn(
                        200,
                        function(){
                            //nothing
                        }
                    )                   
                });

            }
        );
    }
});