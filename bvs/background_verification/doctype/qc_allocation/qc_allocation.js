// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('QC Allocation', {
	onload:function(frm){
		frm.clear_table("qc_allocation");
		frappe.call({
			"method": "frappe.client.get_list",
			args: {
				doctype: "Applicant",
				fieldname: "name",
				limit_page_length: 500,
				filters: {
					"executive": ""
				}
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
									var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
									row.data_entry_allocation_id = r.message.data_entry_allocation_id;
									row.in_date = r.message.in_date;
									row.emp_code = r.message.client_employee_code;
									row.candidate_name = r.message.candidate_name;	
									row.applicant = r.message.name;
									row.customer = r.message.customer;
									row.status = r.message.status;										
								}
								refresh_field("qc_allocation");
							}					
						}
					})
				}
				})
			}
		})
	},
	to_date:function(frm){
		frm.clear_table("qc_allocation");
			frappe.call({
				"method": "frappe.client.get_list",
				args: {
					doctype: "Applicant",
					fieldname: "name",
					limit_page_length: 500
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
									if((r.message.in_date >= frm.doc.in_date_from) && (r.message.in_date <= frm.doc.to_date) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
										row.data_entry_allocation_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.emp_code = r.message.client_employee_code;
										row.candidate_name = r.message.candidate_name;	
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;										
									}
									refresh_field("qc_allocation");
								}					
							}
						})
					}
				    })
			    }
		    })
	},
	customer: function(frm) {
		frm.clear_table("qc_allocation");
		refresh_field("qc_allocation");
        if(frm.doc.customer){
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.get_applicant",
				args:{
					"customer":frm.doc.customer
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
									if((frm.doc.customer == r.message.customer) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
										row.data_entry_allocation_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.emp_code = r.message.client_employee_code;
										row.candidate_name = r.message.candidate_name;	
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										refresh_field("qc_allocation");
										
									}							
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
		frm.clear_table("qc_allocation");
		refresh_field("qc_allocation");
        if(frm.doc.ref_id){
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.get_applicant_details",
				args:{
					"applicant":frm.doc.ref_id
				},
				callback: function (r) {
					if(r.message){
						if((frm.doc.ref_id == r.message.name) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
							var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
							row.data_entry_allocation_id = r.message.data_entry_allocation_id;
							row.in_date = r.message.in_date;
							row.emp_code = r.message.client_employee_code;
							row.candidate_name = r.message.candidate_name;	
							row.applicant = r.message.name;
							row.customer = r.message.customer;
							row.status = r.message.status;
							refresh_field("qc_allocation");
							
						}							
					}
				}
			})
		}
	},
	candidate_name: function(frm){
		frm.clear_table("qc_allocation");
		refresh_field("qc_allocation");
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.get_applicant_c",
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
										var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
										row.data_entry_allocation_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.emp_code = r.message.client_employee_code;
										row.candidate_name = r.message.candidate_name;	
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										refresh_field("qc_allocation");
										
									}							
								}
							}
						})
					}
				    })
			    }
		    })
	},
	emp_code: function(frm){
		frm.clear_table("qc_allocation");
		refresh_field("qc_allocation");
			frappe.call({
				"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.get_applicant_e",
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
										var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
										row.data_entry_allocation_id = r.message.data_entry_allocation_id;
										row.in_date = r.message.in_date;
										row.emp_code = r.message.client_employee_code;
										row.candidate_name = r.message.candidate_name;	
										row.applicant = r.message.name;
										row.customer = r.message.customer;
										row.status = r.message.status;
										refresh_field("qc_allocation");
										
									}							
								}
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
	status: function(frm) {
		frm.clear_table("qc_allocation");
		refresh_field("qc_allocation");	
		if(frm.doc.status){					
		frappe.call({
			"method": "frappe.client.get_list",
			args: {
				doctype: "Applicant",
				fieldname: "name",
				limit_page_length: 500,
				filters: {"status":frm.doc.status, "executive": ""}
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
							if((r.message.status == frm.doc.status) && (r.message.executive == "")){
							if(r.message){
								console.log(r.message)
								var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
								row.data_entry_allocation_id = r.message.data_entry_allocation_id;
									row.in_date = r.message.in_date;
									row.emp_code = r.message.client_employee_code;
									row.candidate_name = r.message.candidate_name;	
									row.applicant = r.message.name;
									row.customer = r.message.customer;
									row.status = r.message.status;
							}	
							refresh_field("qc_allocation");						
						}
						}
					})
				}
				})
			}
		})
	}
	},
	select_executive: function(frm, cdt, cdn) {	
		var grid = frm.fields_dict["qc_allocation"].grid;
		if(frm.doc.select_executive != ""){
			if(grid.get_selected_children().length !== 0){
					$.each(grid.get_selected_children(), function(i, d) {
						frappe.call({
							"method":"frappe.client.get",
							args: {
								doctype: "User",
								name: frm.doc.select_executive
							},
							callback: function (r) {
								if(r.message){
									if(d.idx){
										d.allocated_to = r.message.email
								    }
								}
								refresh_field("qc_allocation");				
							}
						});
						
					})
			}	
		}
		
	},
	upto:function(frm){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "User",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				if(r.message){
					for(var i=0; i < frm.doc.upto; i++){					
					var a = frm.doc.qc_allocation;
					a[i].allocated_to = r.message.email
					}
					refresh_field("qc_allocation");	
							
				}
			}
	    })
	},
	to:function(frm){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "User",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				if(r.message){
					for(var i= frm.doc.from - 1; i < frm.doc.to; i++){					
					var a = frm.doc.qc_allocation;
					a[i].allocated_to = r.message.email
					}
					refresh_field("qc_allocation");	
							
				}
			}
	    })
	},
	assign:function(frm){	
		frappe.call({
			"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.set_assign_to",
			args: {
				"doc": frm.doc.qc_allocation
			},
			freeze:true,
			callback: function(r){
				frappe.msgprint("Updated")
				if(r.message == "ok"){
					frm.clear_table("qc_allocation");
				}
				cur_frm.refresh()
			}
		})
	}

});
