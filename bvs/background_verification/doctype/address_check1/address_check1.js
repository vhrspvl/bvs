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
					frm.set_value("address_line1",r.message.address_line1);
					frm.set_value("address_line2",r.message.address_line2);
					frm.set_value("address_line3",r.message.address_line3);
					frm.set_value("talukdistrict",r.message.talukdistrict);
					frm.set_value("state",r.message.state);
					frm.set_value("city",r.message.city);
					frm.set_value("country",r.message.country);
					frm.set_value("pincode",r.message.pincode);
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
	}
});
