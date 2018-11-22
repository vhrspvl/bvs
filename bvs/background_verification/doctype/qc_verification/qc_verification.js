// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('QC Verification', {
	onload:function(frm){
		frappe.call({
			 "method": "frappe.client.get_list",
			 args: {
				 doctype: "Applicant",
				 fieldname: "name",
				 filters: {"executive": frappe.session.user}
			 }, 
			callback: function(r){
				$.each(r.message, function(i, d) {
		        frappe.call({
					"method":"bvs.background_verification.doctype.qc_verification.qc_verification.get_cases",
					args:{
						"name": d.name
					},
					callback: function (r) {
						if(r.message){
							if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){
								var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
								row.batch_id = r.message.data_entry_allocation_id;
								row.actual_end_date = r.message.actual_end_date;
								row.applicant = r.message.name;
								row.customer = r.message.customer;
								row.status = r.message.status;
								row.allocated_to = frappe.session.user;							
								refresh_field("qc_verification_dashboard"); 
							}				
						}		 
					}
				})
				})
			}
		})
	},
	batch_id:function(frm){
		frm.clear_table("qc_verification_dashboard");
			frappe.call({
				"method": "frappe.client.get_list",
				args: {
					doctype: "Applicant",
					fieldname: "name",
					filters: {"data_entry_allocation_id": frm.doc.batch_id, "executive": frappe.session.user}
                }, 
				callback: function (r) {
					$.each(r.message, function(i, d) {
					if(r.message){
						frappe.call({
							"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.get_applicant_details",
							args:{
								"applicant":d.name
							},
							callback: function (r) {
								if((frm.doc.batch_id == r.message.data_entry_allocation_id) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")) && (r.message.executive == frappe.session.user)){
									var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
									row.batch_id = r.message.data_entry_allocation_id;	
									row.applicant = r.message.name;
									row.customer = r.message.customer;
									row.status = r.message.status;
									row.allocated_to = frappe.session.user;										
								}
								refresh_field("qc_verification_dashboard");							
							}
						})
					}
				    })
			    }
		    })
	},
	refresh: function (frm) {
		frm.disable_save();
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
						row.batch_id = r.message.data_entry_allocation_id;
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