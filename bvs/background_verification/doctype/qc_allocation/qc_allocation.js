// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('QC Allocation', {
	customer: function(frm) {
        if(frm.doc.customer){
			frm.clear_table("qc_allocation");
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
								if(frm.doc.customer == r.message.customer && ((r.message.status == "IQC Pending") ||(r.message.status == "QC PEnding"))){
								if(r.message){
									var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
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
	refresh: function (frm) {
		frm.disable_save();
	},
	status: function(frm) {
        if(frm.doc.customer){
			frm.clear_table("qc_allocation");
			frappe.call({
				"method": "frappe.client.get_list",
				args: {
					doctype: "Applicant",
					fieldname: "name",
					filters: {"customer": frm.doc.customer,"status":frm.doc.status}
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
								if(frm.doc.customer == r.message.customer && (r.message.status == frm.doc.status)){
								if(r.message){
									var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
									    row.applicant = r.message.customer;
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
	select_executive: function(frm, cdt, cdn) {		
		if(frm.doc.select_executive != ""){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "Employee",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				$.each(cur_frm.doc.qc_allocation || [], function(i, d) {
				if(r.message){
					d.allocated_to = r.message.user_id
				}
				});
				refresh_field("qc_allocation");				
			}
		});
		} 
	},
	assign:function(frm){	
	frappe.call({
		"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.set_assign_to",
		args: {
			"doc": frm.doc.qc_allocation,
			"customer": frm.doc.customer
		},
		freeze:true,
		callback: function(r){
			frappe.msgprint("Updated")
			if(r.message == "ok"){
				frm.clear_table("qc_allocation");
			}
		}
		})
	}

});
