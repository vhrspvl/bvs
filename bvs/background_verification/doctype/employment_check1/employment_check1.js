// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Employment Check1', {
// 	after_save: function(frm) {  
// 		if(frm.doc.name){
// 		    frappe.route_options = {"employment_check_id" : frm.doc.name} ;
// 		    frappe.set_route("Form","Applicant",frm.doc.applicant_id);
// 			//frm.set_value("frm.doc.x", frm.doc.name);
			
// 		}
// 	}
// });

frappe.ui.form.on("Employment Check1", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	}
});