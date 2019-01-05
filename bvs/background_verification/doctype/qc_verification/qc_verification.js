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
						if((r.message.executive == frappe.session.user)|| (frappe.user.has_role("BVS Manager"))) {
							if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){
								var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
								row.batch_id = r.message.data_entry_allocation_id;
								row.in_date = r.message.in_date;
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
	to:function(frm){
		frm.clear_table("qc_verification_dashboard");
		refresh_field("qc_verification_dashboard");	
		if(frm.doc.to){
			frappe.call({
				"method": "frappe.client.get_list",
				args: {
					doctype: "Applicant",
					fieldname: "name",
					// filters: {"executive": frappe.session.user}
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
								if(r.message){
									if((r.message.in_date >= frm.doc.in_date_from) && (r.message.in_date <= frm.doc.to) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
										row.batch_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.actual_end_date = r.message.actual_end_date;
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										row.allocated_to = frappe.session.user;									
									}
									refresh_field("qc_verification_dashboard");	
							    }						
							}
						})
					}
				    })
			    }
			})
		}
	},
	refresh: function (frm) {
		frm.disable_save();
	},
	customer: function(frm){	
		frm.clear_table("qc_verification_dashboard");
		refresh_field("qc_verification_dashboard");	
		if(frm.doc.customer){
			frappe.call({
				"method": "frappe.client.get_list",
				args: {
					doctype: "Applicant",
					fieldname: "name",
					filters: {"customer": frm.doc.customer, "executive": frappe.session.user}
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
								if(r.message){									
									if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){							
										var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
										row.batch_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.actual_end_date = r.message.actual_end_date;
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										row.allocated_to = frappe.session.user;									
									}
									refresh_field("qc_verification_dashboard");	
							    }						
							}
						})
					}
				    })
			    }
			})
		}		
	},
	ref_id: function(frm){
		frm.clear_table("qc_verification_dashboard");
		refresh_field("qc_verification_dashboard");	
		if(frm.doc.ref_id){
			frappe.call({
				"method": "frappe.client.get",
				args: {
					doctype: "Applicant",
					"name": frm.doc.ref_id
                }, 
				callback: function (r) {
					if(r.message){								
						if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){							
							var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
							row.batch_id = r.message.data_entry_allocation_id;
							row.in_date = r.message.in_date;
							row.actual_end_date = r.message.actual_end_date;
							row.applicant = r.message.name;
							row.customer = r.message.customer;
							row.status = r.message.status;
							row.allocated_to = frappe.session.user;									
						}
						refresh_field("qc_verification_dashboard");	
					}													
			    }
			})
		}
	},
	candidate_name: function(frm){
		frm.clear_table("qc_verification_dashboard");
		refresh_field("qc_verification_dashboard");
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_verification.qc_verification.get_applicant_c",
				args:{
					"candidate_name":frm.doc.candidate_name
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
								if(r.message){								
									if((frm.doc.candidate_name == r.message.candidate_name) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
										row.batch_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.actual_end_date = r.message.actual_end_date;
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										row.allocated_to = frappe.session.user;									
									}
									refresh_field("qc_verification_dashboard");	
								}
							}
						})
					}
					})
				}
			})
					
	},
	emp_code: function(frm){
		frm.clear_table("qc_verification_dashboard");
		refresh_field("qc_verification_dashboard");
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_verification.qc_verification.get_applicant_e",
				args:{
					"emp_code":frm.doc.emp_code
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
								if(r.message){								
									if((frm.doc.emp_code == r.message.client_employee_code) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Verification Dashboard", "qc_verification_dashboard"); 
										row.batch_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.actual_end_date = r.message.actual_end_date;
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										row.allocated_to = frappe.session.user;									
									}
									refresh_field("qc_verification_dashboard");	
								}
							}
						})
					}
					})
				}
			})
					
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