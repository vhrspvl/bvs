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
			if(frappe.user.has_role("BVS DEO") || frappe.user.has_role("BVS Manager")) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}

	},
	refresh: function(frm){
		frappe.call({
			"method":"bvs.background_verification.doctype.employment_check1.employment_check1.get_value",
			args: {
				"applicant":frm.doc.applicant_id,
				},
			callback: function (r) {
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("employee_name", d.candidate_name);
					}
				})
			}
		});
		if(frm.doc.status == "Entry Pending"){
		if((frm.doc.employee_code && frm.doc.employee_name && frm.doc.employer_name && frm.doc.location && frm.doc.contact_number && frm.doc.employment_type != "Select" && frm.doc.designationjoining && frm.doc.designationleaving && 
		frm.doc.period_of_employment && frm.doc.to && frm.doc.remunerations != "Select" && frm.doc.reporting_managers_name && frm.doc.reporting_managers_designation && frm.doc.reason_for_leaving) && (frm.doc.amount || frm.doc.amount1)) {	
		frm.set_value("status","Entry Completed")
		}
		}
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}

	},
	validate: function(frm){
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
		if(frm.doc.status == "Entry Pending"){
		if((frm.doc.employee_code && frm.doc.employee_name && frm.doc.employer_name && frm.doc.location && frm.doc.contact_number && frm.doc.employment_type != "Select" && frm.doc.designationjoining && frm.doc.designationleaving && 
		frm.doc.period_of_employment && frm.doc.to && frm.doc.remunerations != "Select" && frm.doc.reporting_managers_name && frm.doc.reporting_managers_designation && frm.doc.reason_for_leaving) && (frm.doc.amount || frm.doc.amount1)) {	
		frm.set_value("status","Entry Completed")
		}
		}
		if(frm.doc.allocated_for != frm.doc.status){
			frm.set_value("executive","");
		}
		if(frm.doc.allocated_for == "IQC Pending"){
			frm.set_value("status","IQC Completed")
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			frm.set_value("status","Allocation Completed")
			frm.set_df_property('executive', 'read_only', 1);
		}
		if(frm.doc.allocated_for == "Entry Pending"){
			frm.set_value("status","Entry Completed")
		}
		
	}
		
});