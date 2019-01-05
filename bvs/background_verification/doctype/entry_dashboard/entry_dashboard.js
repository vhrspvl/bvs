frappe.ui.form.on('Entry Dashboard', {
	onload: function(frm, cdt, cdn) {
		frm.toggle_display("pending_case_details")
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
						"name":d.name,
						filters: {
							"cases_pending": ("!=","%")
						}
						}, 
					callback:function(r){	
						if((frappe.session.user == r.message.executive) || (frappe.user.has_role("BVS Manager"))){				
							var row = frappe.model.add_child(frm.doc, "Entry Dashboard List", "entry_dashboard_list");
							row.data_entry_name = r.message.name;
							row.in_date = r.message.in_date;
							row.in_time = r.message.in_time;
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
							row.size = r.message.no_of_cases;
							row.executive = r.message.executive;
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
									} else {
										row.entry_pending = "0";
									}
									refresh_field("entry_dashboard_list");
								}
							})
							frappe.call({
								"method":"frappe.client.get_list",
								args:{
									doctype:"Applicant",
									filters: {
										"customer": r.message.customer,
										"in_date": r.message.in_date,
										"data_entry_allocation_id": r.message.name,
										"status": ["!=", "Entry Pending"]
									},
									group_by: "customer"  
					
								},
								callback:function(r){
									if(r.message){
									// $.each(r.message, function(i, d) {
										var c = Object.keys(r.message).length;
										if(c != 0){
											row.completed = c;	
										}			
								// })
								}else {
									row.completed = "0";
								}
								refresh_field("entry_dashboard_list");
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
									refresh_field("entry_dashboard_list");
								}
								if(row.in_date < frappe.datetime.nowdate()){
									var date_diff = frappe.datetime.get_diff(frappe.datetime.nowdate(), row.in_date)
									row.age = date_diff;
									refresh_field("entry_dashboard_list");
								}else {
									row.age = "0";
									refresh_field("entry_dashboard_list");
								}
								}
							})
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
								"method": "frappe.client.get",
									args: {
									doctype: "Applicant",
									filters: {
										"demographic_id": j.name,
										"customer": d.customer
									}
									},							
								callback:function(r){
									if(r.message.name){
									frappe.set_route('Form','Applicant',r.message.name,{"status": "Entry Pending","demographic_id": j.name,"customer": d.customer,"executive": ('==',"%")});	
									} 
								}
							})
							})					
						}
				})
			} else {
					frappe.set_route('Form','Applicant',"New Applicant",{"customer": d.customer,"allocated_for": "Entry Pending","executive":frappe.session.user,"data_entry_allocation_id":d.data_entry_name,"case_in_date": d.in_date,"in_time":d.time});
     			}
			}

	    });
		frm.fields_dict.entry_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="entry_pending"][data-doctype="Entry Dashboard List"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["Entry Dashboard List"][current_doc];
			var a = locals[cdt][cdn];
			frm.clear_table("entry_pending_list")
			if(d.entry_pending > 0){
				frm.toggle_display("pending_case_details", d.entry_pending)
				frappe.call({
					"method":"frappe.client.get_list",
					args:{
						doctype:"Applicant",
						filters: {
							"status": "Entry Pending",
							"executive": d.executive,
							"customer": d.customer,
							"in_date": d.in_date,
							"data_entry_allocation_id": d.data_entry_name
						},
						group_by: "customer"  
		
					},
					callback: function(r){
						$.each(r.message, function(i, j) {
							frappe.call({
								"method": "frappe.client.get",
									args: {
									doctype: "Applicant",
									name: j.name
									},							
								callback: function(r){
									if(r.message){
										var row = frappe.model.add_child(frm.doc, "Entry Pending List", "entry_pending_list");
										row.customer = r.message.customer;
										row.applicant_name = r.message.name;
										row.status = r.message.status;
										row.in_date = r.message.in_date;
										row.age = d.age;
										refresh_field("entry_pending_list")
									}									
								}
							})
						})
					}
				})
			// frappe.set_route('List','Applicant',{"status":"Entry Pending","customer":d.customer,"data_entry_allocation_id": d.data_entry_name}) ;
			}
		});
		var list = frm.doc.entry_pending_list;
		frm.fields_dict.entry_pending_list.grid.wrapper.on('focus', 'input[data-fieldname="applicant_name"][data-doctype="Entry Pending List"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["Entry Pending List"][current_doc];
			if(d.applicant_name){
				frappe.set_route("Form", "Applicant", d.applicant_name)
			}
		})
		// frm.fields_dict.entry_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="completed"][data-doctype="Entry Dashboard List"]', function(e) {	
		// 	var current_doc = $('.data-row.editable-row').parent().attr("data-name");
		// 	var d = locals["Entry Dashboard List"][current_doc];
		// 	var a = locals[cdt][cdn];
		// 	if(d.entry_pending > 0){
		// 	frappe.set_route('List','Applicant',{"status":["!=","Entry Pending"],"customer":d.customer,"executive": d.executive,"data_entry_allocation_id": d.data_entry_name}) ;
		// 	}
		// });
	},
})