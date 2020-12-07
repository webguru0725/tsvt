<div class="row col-md-12" style="max-width : 100%">
    <div class="col-md-3">
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
                
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Plate No.</p><p style="margin-left:10%" id="plateno"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Serial No.</p><p style="margin-left:10%" id="serialno"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Fleet Name.</p><p style="margin-left:10%" id="fleetname"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Speed.</p><p style="margin-left:10%" id="speed"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Direction.</p><p style="margin-left:10%" id="direction"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Time.</p><p style="margin-left:10%" id="time"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Longitude.</p><p style="margin-left:10%" id="longitude"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Latitude.</p><p style="margin-left:10%" id="latitude"></p></div>
                <div class="row col-md-12"><p class="col-md-6" style="margin-bottom:0px;">Location.</p><p style="margin-left:10%"></p></div>
            </div>
        </div>
        <!--end::Mixed Widget 2-->
    </div>
    <div class="col-md-12" style="position: absolute;">
        <div id="mymap">
        </div>
    </div>
    <div class="card card-custom example example-compact gutter-b" id="showVideoButton" style="margin-left:auto; width: 20px; height: 20px; display:show; text-align: center;">
        <a href="javascript:viewvideo()" style="text-align: center;"><<</a>
    </div>
    <div class="col-xl-6 pull-right" id="videocard" style="margin-left:auto; display:none;">
        <div class="card card-custom example example-compact gutter-b" style="z-index : 1;">
            <div class="card-header">
                <div class="card-title">
                    <h3 class="card-label">VIDEO</h3>
                    <a href="javascript:hiddenvideo()">>></a>
                    <a href="#"><i class="fa fa-arrows-alt"></i></a>
                </div>
            </div>
            <div class="card-body">
                <div class="grid-container" id="videopanel">
                    <div class="item2"><video></video></div>
                    <div class="item2"><video></video></div>                                                             
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
        alert("s")
        $('#videocard').show();
        $('#showVideoButton').hide();
        var vehicle_id = $(this).attr("id");
        var device_id = $(this).attr("device_id");
        var channel_count = $(this).attr("channel_count");
        // var device_id = '0099016054';
        // var channel_count = 2;
        var i;
        var html = '';
        for(i = 1; i <= channel_count; i++)
        {
            html += '<div class="item2"><video id="videoElement'+i+'"></video></div>';
        }
        $('#videopanel').html(html);

        if (flvjs.isSupported()) {
            for(i = 1; i <= channel_count; i++)
            {
                var videoElement = document.getElementById("videoElement"+i);
                var url = 'http://51.77.84.46:12062/live.flv?devid='+device_id+'&chl='+i+'&svrid=127.0.0.1&svrport=17891&st=1&audio=1';
                alert(url)
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: 'http://51.77.84.46:12062/live.flv?devid='+device_id+'&chl='+i+'&svrid=127.0.0.1&svrport=17891&st=1&audio=1'
                });
                flvPlayer.attachMediaElement(videoElement);
                flvPlayer.load();
                flvPlayer.play();
            }
            
        }
    });
</script>