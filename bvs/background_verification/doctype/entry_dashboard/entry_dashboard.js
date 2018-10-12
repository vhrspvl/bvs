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
							refresh_field("entry_dashboard_list");
							frappe.call({
								"method":"frappe.client.get_list",
								args:{
									doctype:"Applicant",
									filters: {
										"status": "Pending",
										"executive": r.message.executive,
										"customer": r.message.customer
									},
									group_by: "customer"  
					
								},
								callback:function(r){
									if(r.message){
										console.log(r.message)
										var c = Object.keys(r.message).length;
										if(c != 0){
											row.entry_pending = c;	
										}	
										if(c == 0){	
											row.entry_pending = "0";	
										}			
									}
									refresh_field("entry_dashboard_list");
								}
					
						    })
						}
					}	
				});
			})
		}
		});
		
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
							// console.log(r.message)
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
									console.log(r.message)	
									frappe.set_route('List','Applicant',r.message,{"status": "Pending","customer": d.customer,"executive": ('==',"%")});	
									})
								 }
							})
							})					
						}
				})
			} else {
					frappe.set_route('Form','Applicant',"New Applicant",{"customer": d.customer});
     			}
			}

	    });
		frm.fields_dict.entry_dashboard_list.grid.wrapper.on('focus', 'input[data-fieldname="entry_pending"][data-doctype="Entry Dashboard List"]', function(e) {	
			var current_doc = $('.data-row.editable-row').parent().attr("data-name");
			var d = locals["Entry Dashboard List"][current_doc];
			var a = locals[cdt][cdn];
			if(d.entry_pending > 0){
			frappe.set_route('List','Applicant',{"status":"Pending","customer":d.customer,"executive": d.executive}) ;
			}
		});
	}

})