// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Address Check1", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
	},
	address_type:function(frm){
		if(frm.doc.address_type === "Yes") {
			frappe.call({
				"method": "frappe.client.get",
                args: {
					doctype:"Applicant",
					name: frm.doc.applicant_id
				},
                callback: function(r){
					// if(r.message.talukdistrict){
						frm.set_value("address_line1",r.message.address_line1);
						frm.set_value("address_line2",r.message.address_line2);
						frm.set_value("address_line3",r.message.address_line3);
						frm.set_value("talukdistrict",r.message.talukdistrict);
						frm.set_value("state",r.message.state);
						frm.set_value("city",r.message.city);
						frm.set_value("country",r.message.country);
						frm.set_value("pincode",r.message.pincode);
					// }
				}

			})
		} else if(frm.doc.address_type === "NO"){
			frm.set_value("address_line1", "");
			frm.set_value("address_line2","");
			frm.set_value("address_line3","");
			frm.set_value("talukdistrict","");
			frm.set_value("state","");
			frm.set_value("city","");
			frm.set_value("country","");
			frm.set_value("pincode","");
		}
	},
	validate: function(frm){
		if(frm.doc.allocated_for != frm.doc.status){
			frm.set_value("executive","");
		}
		if(frm.doc.allocated_for == "IQC Pending"){
			frm.set_value("status","IQC Completed")
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			frm.set_value("status","Allocation Completed")
		}
		if(frm.doc.allocated_for == "Entry Pending"){
			if(frm.doc.status == "Insufficient"){
				frm.set_value("status","Insufficient")
			}else{
				frm.set_value("status","Entry Completed")
			}
		}
		
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
	}
});
