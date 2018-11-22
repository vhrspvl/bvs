frappe.ui.form.on('Entry Dashboard', {
	onload: function(frm, cdt, cdn) {
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
						if(frappe.session.user == r.message.executive){					
							var row = frappe.model.add_child(frm.doc, "Entry Dashboard List", "entry_dashboard_list");
							row.data_entry_name = r.message.name;
							if(r.message.demographic_entry){
							row.demographic_entry = "Yes";
							} else {
							    row.demographic_entry = "No";
							}
							row.customer = r.message.customer;
							if(r.message.cases_pending != 0){
								row.new_entry = r.message.cases_pending;	
							}	
							if(r.message.cases_pending == 0){	
								row.new_entry = "0";	
							}
							
							row.executive = r.message.executive;
							row.entry_pending = "0";
							refresh_field("entry_dashboard_list");
							frappe.call({
								"method":"frappe.client.get_list",
								args:{
									doctype:"Applicant",
									filters: {
										"status": "Entry Pending",
										"executive": r.message.executive,
										"customer": r.message.customer,
										"in_date": r.message.in_date,
										"data_entry_allocation_id": r.message.name
									},
									group_by: "customer"  
					
								},
								callback:function(r){
									if(r.message){
										var c = Object.keys(r.message).length;
										if(c != 0){
											row.entry_pending = c;	
										}				
									}
									refresh_field("entry_dashboard_list");
								}
					
							})
							if((row.entry_pending == "0") && (row.new_entry == "0")){
								var tbl = frm.doc.entry_dashboard_list || [];
								var i = tbl.length;
								while (i--)
								{
									if((tbl[i].new_entry == 0) && (tbl[i].entry_pending == 0))
									{
										cur_frm.get_field("entry_dashboard_list").grid.grid_rows[i].remove();
									}
								}
								cur_frm.refresh();
							}
						}
					}	
				});
			})
		}
		});
	},
	refresh: function (frm) {
		frm.disable_save();
	},
	'onload_post_render': function(frm, cdt, cdn) {
		var list = frm.doc.entry_dashboard_list;
		frm.fields_dict.entry_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="new_entry"][data-doctype="Entry Dashboard List"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["Entry Dashboard List"][current_doc];
			if(d.new_entry > 0){
			if(d.demographic_entry == "Yes"){
				frappe.call({
					"method": "frappe.client.get_list",
						args: {
						doctype: "Demographic Data With Attachment",
						filters:{
							"customer": d.customer
						}
						},				
					callback:function(r){	
						$.each(r.message, function(i, j) {
							frappe.call({
								"method": "frappe.client.get_list",
									args: {
									doctype: "Applicant",
									filters: {
										"demographic_id": j.name,
										"customer": d.customer
									}
									},							
								callback:function(r){
									$.each(r.message, function(i, k) {
									frappe.set_route('List','Applicant',r.message,{"status": "Entry Pending","customer": d.customer,"executive": ('==',"%")});	
									})
								 }
							})
							})					
						}
				})
			} else {
					frappe.set_route('Form','Applicant',"New Applicant",{"customer": d.customer,"allocated_for": "Entry Pending","executive":frappe.session.user,"data_entry_allocation_id":d.data_entry_name});
     			}
			}

	    });
		frm.fields_dict.entry_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="entry_pending"][data-doctype="Entry Dashboard List"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["Entry Dashboard List"][current_doc];
			var a = locals[cdt][cdn];
			if(d.entry_pending > 0){
			frappe.set_route('List','Applicant',{"status":"Entry Pending","customer":d.customer,"executive": d.executive}) ;
			}
		});
	},
})