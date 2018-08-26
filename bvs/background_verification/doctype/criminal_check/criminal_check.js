// Copyright (c) 2017, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Criminal Check", {
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

