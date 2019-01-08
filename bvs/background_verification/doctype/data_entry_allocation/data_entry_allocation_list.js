frappe.listview_settings['Data Entry Allocation'] = {
	refresh:function(me){	
        if(frappe.user.has_role("!=","BVS Manager")){
            if (!frappe.route_options) {
                frappe.route_options = {
                    "executive": ["=", frappe.session.user]
                };
            }
        }
	}
};