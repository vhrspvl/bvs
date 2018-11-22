// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('QC Allocation', {
	onload:function(frm){
       frappe.call({
			"method": "frappe.client.get_list",
			args: {
				doctype: "Applicant",
				fieldname: "name",
				filters: {"executive":""}
			}, 
		   callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frappe.call({
							"method":"bvs.background_verification.doctype.qc_allocation.qc_allocation.get_applicant_details",
							args:{
								"applicant":d.name
							},
							callback: function(r){
								if((r.message.status == "IQC Pending") || (r.message.status == "QC Pending")){
									var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
									row.data_entry_allocation_id = r.message.data_entry_allocation_id;	
									row.applicant = r.message.name;
									row.customer = r.message.customer;
									row.status = r.message.status;
									refresh_field("qc_allocation");
								}
							}
						})
					}
				})
		    }
	    })
	},
	batch_id:function(frm){
		frm.clear_table("qc_allocation");
			frappe.call({
				"method": "frappe.client.get_list",
				args: {
					doctype: "Applicant",
					fieldname: "name",
					filters: {"data_entry_allocation_id": frm.doc.batch_id, "executive": ""}
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
									if((frm.doc.batch_id == r.message.data_entry_allocation_id) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
										row.data_entry_allocation_id = r.message.data_entry_allocation_id;	
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
								if(r.message){
									if((frm.doc.customer == r.message.customer) && ((r.message.status == "IQC Pending") || (r.message.status == "QC Pending"))){
										var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
										row.data_entry_allocation_id = r.message.data_entry_allocation_id;	
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
					filters: {"customer": frm.doc.customer,"status":frm.doc.status, "executive": ""}
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
								if((frm.doc.customer == r.message.customer) && (r.message.status == frm.doc.status) && (r.message.executive == "")){
								if(r.message){
									var row = frappe.model.add_child(frm.doc, "QC Allocation Dashboard", "qc_allocation");                    
									row.data_entry_allocation_id = r.message.data_entry_allocation_id;	
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
	// select_executive: function(frm, cdt, cdn) {		
	// 	if(frm.doc.select_executive != ""){
	// 	frappe.call({
	// 		"method":"frappe.client.get",
	// 		args: {
	// 			doctype: "User",
	// 			name: frm.doc.select_executive
	// 		},
	// 		callback: function (r) {
	// 			$.each(cur_frm.doc.qc_allocation || [], function(i, d) {
	// 			if(r.message){
	// 				d.allocated_to = r.message.email
	// 			}
	// 			});
	// 			refresh_field("qc_allocation");				
	// 		}
	// 	});
	// 	} 
	// },
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
		}
		})
	}

});
