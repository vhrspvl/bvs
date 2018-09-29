// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt


frappe.ui.form.on("Employment Check2", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.applicant_id) {
			if(frappe.user.has_role("BVS DEO")) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
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
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
	},
	validate: function(frm){
		if(frm.doc.allocated_for != frm.doc.status){
			frm.set_value("executive","");
		}
		if(frm.doc.allocated_for == "IQC Pending"){
			frm.set_value("status","IQC Completed")
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			frm.set_value("status","Allocation Completed")
		}
		if(frm.doc.allocated_for == "Entry Pending"){
			frm.set_value("status","Entry Completed")
		}
	}
});