// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Entry Dashboard', {
	onload: function(frm) {
		frappe.call({
			"method": "frappe.client.get_list",
			 args: {
				"doctype": "Data Entry Allocation"
				}, 
			callback: function (r) {
			$.each(r.message, function(i, d) {
				frappe.call({
					"method": "frappe.client.get",
					 args: {
						"doctype": "Data Entry Allocation",
						"name":d.name
						}, 
					callback:function(r){	
						// if(frappe.session.user == r.message.executive){					
							var row = frappe.model.add_child(frm.doc, "Entry Dashboard List", "entry_dashboard_list");
							row.data_entry_name = r.message.name;
							row.customer = r.message.customer;
							var cust = r.message.customer;
							row.new_entry = r.message.cases_pending;
							row.executive = r.message.executive;
							refresh_field("entry_dashboard_list");
							frappe.call({
								"method":"frappe.client.get_list",
								args:{
									doctype:"Applicant",
									filters: {
										"status": "Pending",
										"customer": r.message.customer
									},
									group_by: "customer"  
					
								},
								callback:function(r){
									if(row.customer == cust){
										var c = Object.keys(r.message).length;
										if(c != 0){
											row.entry_pending = c;	
										}	
										if(c == 0){	
											row.entry_pending = "0";	
										}			
										// console.log(row.customer)
										// console.log(c)
										
									}
									refresh_field("entry_dashboard_list");
								}
					
						    })
						}
					// }	
				});
			})
		}
		});
		
	},
	'onload_post_render': function(frm, cdt, cdn) {
		var list = frm.doc.entry_dashboard_list;
		var i = 0;
		var input = 'input[data-fieldname="new_entry"][data-doctype="Entry Dashboard List"]';
		frm.fields_dict.entry_dashboard_list.grid.wrapper.on('focus', 'input', function(i, j) {	
			while(i<list.length){
			console.log(j.idx)
			i += 1;
			}
			
		});
		// 	// frappe.set_route('Form','Applicant','New Applicant');

	}

	// }
	// 'onload_post_render': function(frm) {
	// 	// $.each(frm.doc.entry_dashboard_list, function(i, item) {
	// 	// 	if(frm.doc.entry_dashboard_list){
	// 		console.log(frm.doc.entry_dashboard_list)
	// // 		}
	// // 		// if(item.qty > 0) {
	// // 		// 	  $("div[data-fieldname=new_entry]").find(format('div.grid-row[data-idx="{0}"]', [item.idx])).css({'background-color': '#FF0000 !important'});
	// // 		// }
	// //   });
	// }
})



