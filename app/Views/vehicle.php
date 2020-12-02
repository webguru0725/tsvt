<div class="row">
    <div class="col-xl-4">
        <!--begin::Mixed Widget 2-->
        <div class="card card-custom example example-compact gutter-b">
            <div class="card-header">
                <div class="card-title">
                    <h3 class="card-label">Basic Tree</h3>
                </div>
            </div>
            <div class="card-body">
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
        </div>
        <!--end::Mixed Widget 2-->
    </div>
    <div class="col-xl-8">
        <div class="card card-custom gutter-b">
            <!--begin::Header-->
            <div class="card-header border-0 py-5">
                <h3 class="card-title align-items-start flex-column">
                    <span class="card-label font-weight-bolder text-dark">All Vehicles</span>
                    <span class="text-muted mt-3 font-weight-bold font-size-sm">More than 400+ new fleets</span>
                </h3>
                <div class="card-toolbar">
                    <a href="#" class="btn btn-info font-weight-bolder font-size-sm" data-target="#stack1" data-toggle="modal">Add</a>
                </div>
            </div>
            <!--end::Header-->
            <!--begin::Body-->
            <div class="card-body py-0">
                <!--begin::Table-->
                <div class="table-responsive">
                    <table class="table table-head-custom table-vertical-center" id="kt_advance_table_widget_2">
                        <thead>
                            <tr class="text-uppercase">
                                <th class="pl-0" style="width: 40px">
                                    <label class="checkbox checkbox-lg checkbox-inline mr-2">
                                        <input type="checkbox" value="1">
                                        <span></span>
                                    </label>
                                </th>
                                <th class="pl-0" style="min-width: 100px;">Plate No</th>
                                <th style="min-width: 120px">Parent Fleet</th>
                                <th style="min-width: 120px">Serial No</th>
                                <th class="pr-0 text-right" style="min-width: 160px">action</th>
                            </tr>
                        </thead>
                        <tbody id="fleetsList">
                        <?php foreach($vehicles as $vehicle) : ?>
                            <tr>
                                <td class="pl-0 py-6">
                                    <label class="checkbox checkbox-lg checkbox-inline">
                                        <input type="checkbox" value="1">
                                        <span></span>
                                    </label>
                                </td>
                                <td class="pl-0">
                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"><?php echo $vehicle['CarLicence']; ?></a>
                                </td>
                                <td>
                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">
                                        <?php foreach($fleets as $father) : ?>
                                            <?php if($vehicle['GroupID'] == $father['ID']) echo $father['GroupName']; ?>
                                        <?php endforeach ?>
                                    </a>
                                </td>
                                <td class="pl-0">
                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"><?php echo $vehicle['DeviceID']; ?></a>
                                </td>
                                <td class="pr-0 text-right">
                                    <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
                                        <span class="svg-icon svg-icon-md svg-icon-primary">
                                            <!--begin::Svg Icon | path:/metronic/theme/html/demo13/dist/assets/media/svg/icons/Communication/Write.svg-->
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24"></rect>
                                                    <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path>
                                                    <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                </g>
                                            </svg>
                                            <!--end::Svg Icon-->
                                        </span>
                                    </a>
                                    <a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm">
                                        <span class="svg-icon svg-icon-md svg-icon-primary">
                                            <!--begin::Svg Icon | path:/metronic/theme/html/demo13/dist/assets/media/svg/icons/General/Trash.svg-->
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24"></rect>
                                                    <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path>
                                                    <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path>
                                                </g>
                                            </svg>
                                            <!--end::Svg Icon-->
                                        </span>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach ?>
                        </tbody>
                    </table>
                </div>
                <!--end::Table-->
            </div>
            <!--end::Body-->
        </div>
    </div>
</div>
<div id="stack1" class="modal fade" tabindex="-1" data-width="400"> 
    <div class="modal-dialog"> 
        <div class="modal-content"> 
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button> 
                <h4 class="modal-title">Add Vehicle</h4> 
            </div> 
            <div class="modal-header"> 
                <h4 class="modal-title" style="color:green;">Add Vehicle</h4> 
            </div> 
            <form action="#" id="my_form" method="post" onsubmit="addVehicle()">
            <div class="modal-body"> 
                <div class="row col-md-12"> 
                    <div class="col-md-6"> 
                        <h4>Plate No</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Serial No</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Protocal</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                        <h4>Parent Fleet</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                    </div> 
                    <div class="col-md-6"> 
                        <h4>Channels</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Transmit IP</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Transmit Port</h4> 
                        <p> <input type="text" id="remark" name="remark" class="col-md-12 form-control"> </p> 
                    </div> 
                </div>
            </div> 
            <div class="modal-header"> 
                <h4 class="modal-title" style="color:green;">Channel Set</h4> 
            </div> 
            <div class="modal-body"> 
                <div class="row"> 
                    <div class="col-md-12"> 
                        <h4>Plate No</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Serial No</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                    </div> 
                </div>
            </div> 
            <div class="modal-header"> 
                <h4 class="modal-title" style="color:green;">SIM Card</h4> 
            </div> 
            <div class="modal-body"> 
                <div class="row col-md-12"> 
                    <div class="col-md-6"> 
                        <h4>SIM No</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>IMEI</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                    </div> 
                    <div class="col-md-6">
                        <h4>IMSI</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Network Module Type</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                    </div>
                </div>
            </div> 
            <div class="modal-header"> 
                <h4 class="modal-title" style="color:green;">Vehicle File</h4> 
            </div> 
            <div class="modal-body"> 
                <div class="row col-md-12"> 
                    <div class="col-md-6"> 
                        <h4>Vehicle Type</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                        <h4>Factory Grade</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Passenger capacity(person)</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Engine Number</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Chassis Number</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Fuel Type</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>  
                    </div> 
                    <div class="col-md-6">
                    <h4>Road Transport Certificate</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>  
                        <h4>Technical Grade</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                        <h4>Validity Period</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>
                        <h4>Fuel Consumption/100Km(L)</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>  
                        <h4>Province</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>  
                        <h4>City</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>  
                    </div>
                </div>
            </div> 
            <div class="modal-header"> 
                <h4 class="modal-title" style="color:green;">Equipment File</h4> 
            </div> 
            <div class="modal-body"> 
                <div class="row"> 
                    <div class="col-md-12"> 
                        <h4>Device username</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Device password</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Factory lot number</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>
                        <h4>Factory lot time</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>
                        <h4>Installer</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>     
                        <h4>Installation date</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>
                        <h4>Peripheral description</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p>     
                    </div> 
                </div>
            </div> 
            <div class="modal-footer"> 
                <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button> 
                <button type="submit" id="submit" class="btn red">Ok</button> 
            </div> 
            </form>
        </div> 
    </div> 
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
            "icon": "fa fa-folder"
        },
        "file": {
            "icon": "fa fa-file"
        }
    },
    "plugins": ["types"]
});
</script>
<script>
    $("#kt_tree_1").on("select_node.jstree",function (e, data) {
        var fleet_id = data.node.id.split("_")[2];
        getPaging(fleet_id);
    });
    function getPaging(id)
    {
        var fleet_id = id;
        var html = '';
        $.ajax({
            url: 'vehicle/vehicle_ajax_get/' + fleet_id,
            type: 'get',
            dataType: 'json',
            success: function(data) {
            console.log(data)
                var vehicles = data['vehicles'];
                var i;
                var html = '';
                console.log(vehicles)
                if(vehicles.length == 0)
                {
                    html = '';
                }
                else{
                    for(i = 0; i < vehicles.length; i++)
                    {
                        html += '<tr>'+
                            '<td class="pl-0 py-6"><label class="checkbox checkbox-lg checkbox-inline"><input type="checkbox" value="1"><span></span></label></td>'+ 
                            '<td class="pl-0"><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+vehicles[i]['CarLicence']+'</a></td>'+ 
                            '<td><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+vehicles[i]['fatherName']+'</td>'+ 
                            '<td class="pl-0"><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+vehicles[i]['DeviceID']+'</a></td>'+ 
                            '<td class="pr-0 text-right"><a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"><span class="svg-icon svg-icon-md svg-icon-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path><path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path></g></svg></span></a><a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm"><span class="svg-icon svg-icon-md svg-icon-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path><path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path></g></svg></span></a></td>'
                            '</tr>';
                    }
                }
                $('#fleetsList').html(html);
                
            },
            error: function(data) {
                alert("no");
                //alert("Failed");
                //console.log(data)
            },
        });
    }
</script>
