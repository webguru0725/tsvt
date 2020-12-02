

<div class="row">
    <div class="col-xl-3">
        <!--begin::Mixed Widget 2-->
        <div class="card card-custom example example-compact gutter-b">
            <div class="card-header">
                <div class="card-title">
                    <h3 class="card-label">Basic Tree</h3>
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
                                                                    <li><?php echo $vehicle['CarLicence']; ?></li>
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
                <i class="icon-info font-blue-steel"></i><span style="font-size:16px; color:green;">INFO</span>
                
            </div>
        </div>
        <!--end::Mixed Widget 2-->
    </div>
</div>
<div id="mymap">
</div>
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