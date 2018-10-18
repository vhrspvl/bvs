// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('QC Verification', {
	onload: function(frm) {
		frappe.call({
			"method":"bvs.background_verification.doctype.qc_verification.qc_verification.get_cases",
			args:{
			},
			callback: function (r) {
				if(r.message){
					if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){							
					var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
					row.applicant = r.message.name;
					row.customer = r.message.customer;
					row.status = r.message.status;
					row.allocated_to = frappe.session.user;	
					refresh_field("qc_verification_dashboard"); 	
					}				
				}		 
			}
		})
	},
	customer: function(frm){		
		if(frm.doc.customer){
			cur_frm.clear_table("qc_verification_dashboard");
			cur_frm.refresh_fields();
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_verification.qc_verification.get_case",
				args:{
					"customer":frm.doc.customer
				},
				callback: function (r) {									
					if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){							
						var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
						row.applicant = r.message.name;
						row.customer = r.message.customer;
						row.status = r.message.status;
						row.allocated_to = frappe.session.user;	
						refresh_field("qc_verification_dashboard"); 	
					}
				}
				
            });
		}	
	},
	'onload_post_render': function(frm, cdt, cdn) {
		var list = frm.doc.qc_verification_dashboard;
		frm.fields_dict.qc_verification_dashboard.grid.wrapper.on('focus', 'input[data-fieldname="applicant"][data-doctype="QC Verification Dashboard"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["QC Verification Dashboard"][current_doc];
			frappe.set_route('Form',"Applicant",d.applicant) ;
		})
	}
});