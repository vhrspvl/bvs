// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Employment Check3", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	refresh: function(frm){
		frappe.call({
			"method":"bvs.background_verification.doctype.employment_check2.employment_check2.get_value",
			args: {
				"applicant":frm.doc.applicant_id,
				},
			callback: function (r) {
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("employee_name", d.employee_name);
						frm.set_value("location", d.location);
						frm.set_value("contact_number", d.contact_number);
					}
				})
			}
		});
	}
});

