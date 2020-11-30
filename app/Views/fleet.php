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
                                <li data-jstree='{ "opened" : true }' onclick="getPaging(<?php echo $fleet['ID']; ?>)">
                                    <?php echo $fleet['GroupName']; ?>
                                    <ul>
                                        <?php foreach($fleets as $row) { ?>
                                            <?php if($fleet['ID'] == $row['GroupFatherID']) { ?>
                                                <li data-jstree='{ "type" : "file" }' onclick="getPaging(<?php echo $row['ID']; ?>)">
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
                    <span class="card-label font-weight-bolder text-dark">All Fleets</span>
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
                                <th class="pl-0" style="min-width: 100px;">Fleet Name</th>
                                <th style="min-width: 120px">Parent Fleet</th>
                                <th class="pr-0 text-right" style="min-width: 160px">action</th>
                            </tr>
                        </thead>
                        <tbody id="fleetsList">
                        <?php foreach($fleets as $fleet) : ?>
                            <tr>
                                <td class="pl-0 py-6">
                                    <label class="checkbox checkbox-lg checkbox-inline">
                                        <input type="checkbox" value="1">
                                        <span></span>
                                    </label>
                                </td>
                                <td class="pl-0">
                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg"><?php echo $fleet['GroupName']; ?></a>
                                </td>
                                <td>
                                    <a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">
                                        <?php foreach($fleets as $father) : ?>
                                            <?php if($fleet['GroupFatherID'] == $father['ID']) echo $father['GroupName']; ?>
                                        <?php endforeach ?>
                                    </a>
                                </td>
                                <td class="pr-0 text-right">
                                    <a href="javascript:editData('<?php echo $fleet['ID']; ?>');" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
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
                <h4 class="modal-title">Add Fleet</h4> 
            </div> 
            <form action="#" id="my_form" method="post" onsubmit="addFleet()">
            <div class="modal-body"> 
                <div class="row"> 
                    <div class="col-md-12"> 
                        <h4>Fleet Name</h4> 
                        <p> <input type="text" name="name" id="name" class="col-md-12 form-control"> </p> 
                        <h4>Parent Fleet</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                        <h4>Remark</h4> 
                        <p> <input type="text" id="remark" name="remark" class="col-md-12 form-control"> </p> 
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
<div id="stack2" class="modal fade" tabindex="-1" data-width="400"> 
    <div class="modal-dialog"> 
        <div class="modal-content"> 
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button> 
                <h4 class="modal-title">Add Fleet</h4> 
            </div> 
            <form action="#" id="my_form" method="post" onsubmit="updateFleet()">
            <div class="modal-body"> 
                <div class="row"> 
                    <div class="col-md-12"> 
                        <h4>Fleet Name</h4> 
                        <p> <input type="text" name="current_name" id="current_name" class="col-md-12 form-control"> </p> 
                        <h4>Parent Fleet</h4> 
                        <p> 
                            <select class="form-control col-md-12" id="current_parent_id">
                                <?php foreach($fleets as $fleet) { ?>
                                <option value="<?php echo $fleet['ID']; ?>"><?php echo $fleet['GroupName']; ?></option>
                                <?php } ?>
                            </select>
                        </p> 
                        <h4>Remark</h4> 
                        <p> <input type="text" id="current_remark" name="remark" class="col-md-12 form-control"> </p> 
                    </div> 
                </div>
            </div> 
            <div class="modal-footer"> 
                <input type='hidden' type="text" id="current_id">
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
    function getPaging(id)
    {
        var fleet_id = id;
        var html = '';
        $.ajax({
            url: 'fleet/fleets_ajax_get',
            type: 'get',
            dataType: 'json',
            success: function(data) {
                var fleets = data['fleets'];
                var i;
                var html = '';
                console.log(fleets)
                for(i = 0; i < fleets.length; i++)
                {
                    if(fleet_id == 1)
                    {
                        html += '<tr>'+
                            '<td class="pl-0 py-6"><label class="checkbox checkbox-lg checkbox-inline"><input type="checkbox" value="1"><span></span></label></td>'+ 
                            '<td class="pl-0"><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+fleets[i]['GroupName']+'</a></td>'+ 
                            '<td><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+fleets[i]['fatherName']+'</td>'+ 
                            '<td class="pr-0 text-right"><a href="javascript:editData('+<?php echo $fleet['ID']; ?>+');" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"><span class="svg-icon svg-icon-md svg-icon-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path><path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path></g></svg></span></a><a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm"><span class="svg-icon svg-icon-md svg-icon-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path><path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path></g></svg></span></a></td>'
                            '</tr>';
                    }
                    else if(fleets[i]['ID'] == fleet_id || fleets[i]['GroupFatherID'] == fleet_id)
                    {
                        html += '<tr>'+
                            '<td class="pl-0 py-6"><label class="checkbox checkbox-lg checkbox-inline"><input type="checkbox" value="1"><span></span></label></td>'+ 
                            '<td class="pl-0"><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+fleets[i]['GroupName']+'</a></td>'+ 
                            '<td><a href="#" class="text-dark-75 font-weight-bolder text-hover-primary font-size-lg">'+fleets[i]['fatherName']+'</td>'+ 
                            '<td class="pr-0 text-right"><a href="javascript:editData('+<?php echo $fleet['ID']; ?>+');" class="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"><span class="svg-icon svg-icon-md svg-icon-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953)"></path><path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path></g></svg></span></a><a href="#" class="btn btn-icon btn-light btn-hover-primary btn-sm"><span class="svg-icon svg-icon-md svg-icon-primary"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"></path><path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"></path></g></svg></span></a></td>'
                            '</tr>';
                        
                    }
                    $('#fleetsList').html(html);
                }
                
            },
            error: function(data) {
                alert("no");
                //alert("Failed");
                //console.log(data)
            },
        });
    }

    function addFleet()
    {
        var name = $("#name").val();
        var parent_id = $("#parent_id").val();
        var remark = $("#remark").val();
        $.ajax({
            url: 'fleet/fleet_add_ajax_post',
            type: 'post',
            data: {"name" : name, "parent_id" : parent_id, "remark" : remark},
            dataType: 'json',
            success: function(data) {
                getPaging(1);
            },
            error: function(data) {
              
                //alert("Failed");
                //console.log(data)
            },
        });
    }

    function updateFleet()
    {
        var name = $("#current_name").val();
        var parent_id = $("#current_parent_id").val();
        var remark = $("#current_remark").val();
        var id = $('#current_id').val();
        $.ajax({
            url: 'fleet/fleet_update_ajax_post',
            type: 'post',
            data: {"id" : id, "name" : name, "parent_id" : parent_id, "remark" : remark},
            dataType: 'json',
            success: function(data) {
                getPaging(1);
                
            },
            error: function(data) {
              
                //alert("Failed");
                //console.log(data)
            },
        });
    }

    $("#submit").click(function(){
        console.log('a=====================');
    });

    function editData(id)
    {
        alert(id);
        $.ajax({
            url: 'fleet/fleet_ajax_get/' + id,
            type: 'get',
            dataType: 'json',
            success: function(data) {
                var fleet = data['fleet'];
                $("#current_name").val(fleet['GroupName']);
                $("#current_parent_id").val(fleet['GroupFatherID']);
                $("#current_remark").val(fleet['Remark']);
                $("#current_id").val(id);
            },
            error: function(data) {
                alert("no");
            },
        });

        $("#stack2").modal();
    }
</script>