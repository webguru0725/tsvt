<div class="row col-md-12" style="max-width : 100%">
    <div class="col-md-3" style="min-width: 300px;">
        <!--begin::Mixed Widget 2-->
        <div class="card card-custom example example-compact gutter-b" style="z-index : 100;">
            <div class="card-header">
                <div class="card-title">
                    <h3 class="card-label">Basic Tree</h3>
                    <i class="fa fa-caret-square-o-right"></i>
                </div>
            </div>
            <div class="card-body" style="height: 300px; overflow-y: scroll;">
                <div id="kt_tree_1" class="tree-demo">
                    <ul>
                        <li>
                        <a onclick="getPaging(1)">Center</a>
                            <ul>
                                <?php foreach($fleets as $fleet) {/*print_r($fleet);*/
                                if ($fleet['GroupFatherID'] == 1) {
                                ?>
                                    <li data-jstree='{ "opened" : true }' id="fleet_id_<?php echo $fleet['ID']; ?>" class="items parent">
                                        <?php echo $fleet['GroupName']; ?>
                                        <ul>
                                            <?php foreach($fleets as $row) { ?>
                                                <?php if($fleet['ID'] == $row['GroupFatherID']) { ?>
                                                    <li data-jstree='{ "type" : "file" }' id="fleet_id_<?php echo $row['ID']; ?>" class="items child">
                                                        <?php echo $row['GroupName']; ?>
                                                        <ul>
                                                            <?php foreach($vehicles as $vehicle) { ?>
                                                                <?php if($vehicle['GroupID'] == $row['ID']) { ?>
                                                                    <li class="vehicle" id="<?php echo $vehicle['ID'];?>" device_id="<?php echo $vehicle['DeviceID'];?>" channel_count="<?php echo $vehicle['channel'];?>"><?php echo $vehicle['CarLicence']; ?>
                                                                        <ul>  
                                                                            <?php for($i = 0; $i < $vehicle['channel']; $i++) { ?>  
                                                                            <li><?php echo $i +1; ?></li>
                                                                            <?php } ?>
                                                                        </ul>
                                                                    </li>
                                                                <?php } ?>
                                                            <?php } ?>
                                                        </ul>
                                                    </li>
                                                <?php } ?>
                                            <?php } ?>
                                        </ul>
                                    </li>
                                <?php }} ?>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-body">
                <i class="fa fa-car font-blue" style="margin-left:10px;"></i><span>23</span>
                <i class="fa fa-power-off font-green-jungle" style="margin-left:10px;"></i><span>23</span>
                <i class="fa fa-power-off font-green-jungle" style="margin-left:10px;"></i><span>23</span>
                <i class="fa fa-bell font-red" style="margin-left:10px;"></i><span>23</span>
                <i class="fa fa-line-chart font-green-jungle" style="margin-left:10px;"></i><span>23</span>
            </div>
            <div class="card-footer">
                <div class="row">
                <i class="icon-info font-blue-steel"></i><span style="font-size:16px; color:green;">INFO</span>
                </div>
                
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Plate No.</p><p style="margin-left:10%; margin-bottom:0px;" id="plateno"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Serial No.</p><p style="margin-left:10%; margin-bottom:0px;" id="serialno"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Fleet Name.</p><p style="margin-left:10%; margin-bottom:0px;" id="fleetname"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Speed.</p><p style="margin-left:10%; margin-bottom:0px;" id="speed"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Direction.</p><p style="margin-left:10%; margin-bottom:0px;" id="direction"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Time.</p><p style="margin-left:10%; margin-bottom:0px;" id="time"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Longitude.</p><p style="margin-left:10%; margin-bottom:0px;" id="longitude"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Latitude.</p><p style="margin-left:10%; margin-bottom:0px;" id="latitude"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Location.</p><p style="margin-left:10%; margin-bottom:0px;"></p></div>
            </div>
        </div>
        <!--end::Mixed Widget 2-->
    </div>
    <div class="col-md-12" style="position: absolute;">
        <div id="mymap">
        </div>
    </div>
    <!-- <div class="card card-custom example example-compact gutter-b" id="showVideoButton" style="margin-left:auto; width: 20px; height: 20px; display:show; text-align: center;">
        <a href="javascript:viewvideo()" style="text-align: center;"><<</a>
    </div> -->
    <button draggable="false" id="showVideoButton" title="Toggle fullscreen view" aria-label="Toggle fullscreen view" type="button" class="gm-control-active gm-fullscreen-control" style="background: none rgb(255, 255, 255);border: 0px;margin: 10px;padding: 0px;text-transform: none;appearance: none;position: absolute;cursor: pointer;user-select: none;border-radius: 2px;height: 40px;width: 40px;box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;overflow: hidden;top: 110px;right: 0px;">
        <a href="javascript:viewvideo()" style="text-align: center;"><<</a>
    </button>
    <div class="col-xl-6 pull-right" id="videocard" style="margin-left:auto; display:none;">
        <div class="card card-custom example example-compact gutter-b" style="z-index : 1;">
            <div class="card-header">
                <div class="card-title container">
                    <h3 class="card-label">VIDEO</h3>
                    <a href="javascript:hiddenvideo()">>></a>
                    <!-- <p id="counting">d</p> -->
                    <div class="loaderss" id="loading" style="margin-left: auto; display: none;"></div>
                    
                </div>
            </div>
            <div class="card-body">
                
                <div class="grid-container" id="videopanel">
                    <!-- <div class="item2"><video></video></div>
                    <div class="item2"><video></video></div>                                                              -->
                </div>  
                <div id="myProgress" style="margin-left: auto; margin-top: 10px; display: none;">
                    <div id="myBar">40 sec</div>
                </div>                                                       
                <!-- <video id="videoElement" width="80%" height="800px"></video>                                                     -->
            </div>
        </div>
    </div>
    
</div>
<!-- <script>
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://51.77.84.46:12060/live.flv?devid=0099016054&chl=1&svrid=127.0.0.1&svrport=17891&st=1&audio=1'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement1');
        var flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://51.77.84.46:12060/live.flv?devid=0099016054&chl=2&svrid=127.0.0.1&svrport=17891&st=1&audio=1'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
</script> -->
<script>
$("#kt_tree_1").jstree({
    "core": {
        "themes": {
            "responsive": false
        }
    },
    "types": {
        "default": {
            "icon": "fa fa-car"
        },
        "file": {
            "icon": "fa fa-car"
        }
    },
    "plugins": ["types"]
});
</script>
<script>
    function init() {
        console.log("+==============");
        var mapDiv = document.getElementById("mymap");
        var mapOptions = {
            center: new google.maps.LatLng (48.864716, 2.349014),
            zoom: 4
        };
        var map = new google.maps.Map(mapDiv, mapOptions);
    }
    init();
</script>
<script>
    function viewvideo()
    {
        $('#videocard').show();
        $('#showVideoButton').hide();
    }

    function hiddenvideo()
    {
        $('#videocard').hide();
        $('#showVideoButton').show();
    }

    $(document).on('dblclick', 'li.vehicle', function(){
        $('#videocard').show();
        $('#showVideoButton').hide();
        $('#myProgress').show();
        var vehicle_id = $(this).attr("id");
        console.log(vehicle_id);
        // var device_id = $(this).attr("device_id");
        // var channel_count = $(this).attr("channel_count");

        $.ajax({
            url: 'liveView/vehicle_ajax_get/' + vehicle_id,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                console.log(data)
                document.getElementById("plateno").innerHTML = data[0]['CarLicence'];
                document.getElementById("serialno").innerHTML = data[0]['DeviceID'];
                document.getElementById("fleetname").innerHTML = data[0]['GroupName'];
            },
            error: function(data) {
                alert("no");
            },
        });
        var sss = new Date().getTime();
        console.log(sss);
        var p = 4;
        var guid = 1607482749202;
        $.ajax({
            headers: {"Accept": "application/json", 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Expose-Headers': '*', 'Access-Control-Allow-Credentials': true},
            // headers: {"Accept": "application/json"},
            url: 'http://51.77.84.46:12056/report/last-status/last-gps-info',
            // headers: {'Cookie': "ac2=MTYwNzUxNzA2OCo5Mio0Yg%3D%3D;wcms5u=eyJ1aWQiOjEsInJpZCI6MSwidW4iOiJhZG1pbiIsInZlIjpudWxsfQ; wcms5s=1607517073; wcms5c={%22L%22:%22en-US%22%2C%22V%22:%226.2.0.0%22%2C%22HP%22:8090%2C%22FP%22:[12060%2C12061%2C12062%2C12063]%2C%22TP%22:17891%2C%22RP%22:3113%2C%22SU%22:%22KMH%22%2C%22MT%22:%22GMap_EN%22%2C%22AT%22:%223%22%2C%22E%22:%22on%22%2C%22isJump%22:false%2C%22MK%22:%22AIzaSyBcdRP1MKeic1gp_CT1Afd5Gew1IautTWk%22%2C%22T%22:%221%22%2C%22ET%22:1607484656686}; io=9FwrG9Ryh6WaKnzyAAAX"},
            cache:		false,
            crossDomain: true,
            xhrFields:	{withCredentials:true},
            type:		"POST",
            contentType: "application/json",
            // headers:	{"Cookie":"wcms5u=eyJ1aWQiOjEsInJpZCI6MSwidW4iOiJhZG1pbiIsInZlIjpudWxsfQ; ac2=MTYwNzUxMDc5NSo4MioxZg%3D%3D; wcms5s=1607510800; wcms5c={%22L%22:%22en-US%22%2C%22V%22:%226.2.0.0%22%2C%22HP%22:8090%2C%22FP%22:[12060%2C12061%2C12062%2C12063]%2C%22TP%22:17891%2C%22RP%22:3113%2C%22SU%22:%22KMH%22%2C%22MT%22:%22GMap_EN%22%2C%22AT%22:%223%22%2C%22E%22:%22on%22%2C%22isJump%22:false%2C%22MK%22:%22AIzaSyBcdRP1MKeic1gp_CT1Afd5Gew1IautTWk%22%2C%22T%22:%221%22%2C%22ET%22:1607478383682}; io=WXpL7iU5-USOxfXqAAAS"},
            // cookie:		"wcms5u=eyJ1aWQiOjEsInJpZCI6MSwidW4iOiJhZG1pbiIsInZlIjpudWxsfQ; ac2=MTYwNzUxMDc5NSo4MioxZg%3D%3D; wcms5s=1607510800; wcms5c={%22L%22:%22en-US%22%2C%22V%22:%226.2.0.0%22%2C%22HP%22:8090%2C%22FP%22:[12060%2C12061%2C12062%2C12063]%2C%22TP%22:17891%2C%22RP%22:3113%2C%22SU%22:%22KMH%22%2C%22MT%22:%22GMap_EN%22%2C%22AT%22:%223%22%2C%22E%22:%22on%22%2C%22isJump%22:false%2C%22MK%22:%22AIzaSyBcdRP1MKeic1gp_CT1Afd5Gew1IautTWk%22%2C%22T%22:%221%22%2C%22ET%22:1607478383682}; io=WXpL7iU5-USOxfXqAAAS",
            dataType: 'json',
            data: {"vehicleIds": p, "guid": guid, "token": ""},
            // beforeSend: function(xhr) {
            //     xhr.setRequestHeader("Cookie", 'ac2=MTYwNzUxNzA2OCo5Mio0Yg%3D%3D;wcms5u=eyJ1aWQiOjEsInJpZCI6MSwidW4iOiJhZG1pbiIsInZlIjpudWxsfQ; wcms5s=1607517073; wcms5c={%22L%22:%22en-US%22%2C%22V%22:%226.2.0.0%22%2C%22HP%22:8090%2C%22FP%22:[12060%2C12061%2C12062%2C12063]%2C%22TP%22:17891%2C%22RP%22:3113%2C%22SU%22:%22KMH%22%2C%22MT%22:%22GMap_EN%22%2C%22AT%22:%223%22%2C%22E%22:%22on%22%2C%22isJump%22:false%2C%22MK%22:%22AIzaSyBcdRP1MKeic1gp_CT1Afd5Gew1IautTWk%22%2C%22T%22:%221%22%2C%22ET%22:1607484656686}; io=9FwrG9Ryh6WaKnzyAAAX');  
            // },
            success: function(data) {
                console.log(data);
                // alert("ok");
                
            },
            error: function(err) {
                console.log(err);
                // alert("nwo");
            },
        });
        var device_id = '0099015FCA';
        var channel_count = 2;
        var i;
        var html = '';
        var flvPlayer = [];
        for(i = 1; i <= channel_count; i++)
        {
            html += '<div class="item2" id="video"><video id="videoElement'+i+'"></video></div>';
        }
        $('#videopanel').html(html);

        if (flvjs.isSupported()) {
            for(i = 1; i <= channel_count; i++)
            {
                
                var videoElement = document.getElementById("videoElement"+i);
                var url = 'http://51.77.84.46:12062/live.flv?devid='+device_id+'&chl='+i+'&svrid=127.0.0.1&svrport=17891&st=1&audio=1';
                console.log(url)
                flvPlayer[i-1] = flvjs.createPlayer({
                    type: 'flv',
                    url: 'http://51.77.84.46:12062/live.flv?devid='+device_id+'&chl='+i+'&svrid=127.0.0.1&svrport=17891&st=1&audio=1'
                });
                $('#loading').show();
                flvPlayer[i-1].attachMediaElement(videoElement);
                flvPlayer[i-1].load();
                flvPlayer[i-1].play();
                // document.getElementById("video").innerHTML = "Loading";
                
                setTimeout(() => {
                    $('#loading').hide();
                    // flvPlayer[i-1].play();
                }, 8000);
               
                // var time = 40;
                // var elem = document.getElementById("myBar");
                // var timerId = setInterval(function() {
                    
                //     // if(time <= 30)
                //     // {
                //     //     document.getElementById("counting").innerHTML = time;
                //     // }
                //     if(time <= 0)
                //     {
                //         flvPlayer.unload();
                //         clearInterval(timerId);
                //     }
                //     time--;
                //     elem.style.width = 100*time/40 + "%";
                //     elem.innerHTML = time  + "%";
                // }, 1000);
                // setTimeout(() => {
                //     flvPlayer.close();
                // }, 7000);
            }
            
        }
        var time = 40;
        var elem = document.getElementById("myBar");

        var timerId = setInterval(function() {
            
            // if(time <= 30)
            // {
            //     document.getElementById("counting").innerHTML = time;
            // }
            if(time <= 0)
            {
                for(i = 1; i <= channel_count; i++)
                {
                    flvPlayer[i-1].unload();
                }
                clearInterval(timerId);
                // flvPlayer.unload();
            }
            time--;
            elem.style.width = 100*time/40 + "%";
            elem.innerHTML = time  + "sec";
        }, 1000);
        
    });
</script>