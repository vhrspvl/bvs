// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Data Entry Allocation', {
	refresh: function(frm) {

	},
	validate: function(frm){
		frm.set_value("cases_pending", frm.doc.no_of_cases);
		
	},
	onload: function(frm){
		if(!frm.doc.in_date){
            frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
		frm.clear_table("data_entry_allocation_executive");				
		frappe.call({
			"method":"bvs.background_verification.doctype.data_entry_allocation.data_entry_allocation.get_pending_cases",
			args:{				
			},
			callback:function(r){
				if(r.message){
					var c = Object.keys(r.message).length;
					for(var i=0; i< c; i++){
						var row = frappe.model.add_child(frm.doc, "Data Entry Allocation Executive", "data_entry_allocation_executive");
						row.executive = r.message[i].executive;
						row.pending_cases = r.message[i].pending_cases;
						console.log(r.message[i].executive)							
					}						
				}
				refresh_field("data_entry_allocation_executive");					 
			}
		})
	}
});
