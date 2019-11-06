frappe.listview_settings['Applicant'] = {
    onload: function (listview) {
        if (frappe.user.has_role("BVS Manager")) {
            listview.page.add_menu_item(__("Refresh Cases"), function () {
                // listview.call_for_selected_items(method, { 'status': 'Level 1 Approved' });
                frappe.call({
                    method: "bvs.background_verification.doctype.applicant.applicant.refresh_cases",
                    args: {
                    },
                    freeze: true,
                    freeze_message: __("Updating"),
                    callback: function () {
                        listview.refresh();
                        frappe.msgprint("Updated")
                    }
                })
            })
        }
    }
    // 	refresh:function(me){	
    //         if((frappe.user.has_role("BVS Verifier")) || (frappe.user.has_role("BVS DEO"))){
    //         // if((!frappe.user.has_role("BVS Manager")) || (!frappe.user.has_role("System Manager"))){
    //             if (!frappe.route_options) {
    //                 frappe.route_options = {
    //                     "executive": ["=", frappe.session.user]
    //                 };
    //             }
    //         }
    // 	}
};