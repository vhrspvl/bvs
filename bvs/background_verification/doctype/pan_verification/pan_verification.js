// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Pan Verification", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
		if(frm.doc.pan_number){
			me = $(cur_frm.fields_dict.pan_number.input);
		    me.attr("length", "10");
		    if(frappe.user.has_role("BVS DEO")) {
			    frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
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
		if(!frm.doc.pan_number){
			frappe.msgprint("Please Enter the Pan Number")
		}
		
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
	}
});