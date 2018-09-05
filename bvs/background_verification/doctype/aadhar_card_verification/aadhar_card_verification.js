// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Aadhar Card Verification", {
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
	refresh: function(frm){
		frappe.call({
			"method":"bvs.background_verification.doctype.aadhar_card_verification.aadhar_card_verification.get_value",
			args: {
				"applicant":frm.doc.applicant_id,
				},
			callback: function (r) {
				// $.each(r.message, function(i, d) {
				if(r.message){
					// console.log(r.message)
					frm.set_value("person_name", r.message.candidate_name);
					frm.set_value("dob", r.message.dob);
					frm.set_value("address_line1", r.message.address_line1);
					frm.set_value("address_line2", r.message.address_line2);
					frm.set_value("address_line3", r.message.address_line3);
					frm.set_value("talukdistrict", r.message.talukdistrict);
					frm.set_value("city", r.message.city);
					frm.set_value("state", r.message.state);
					frm.set_value("country", r.message.country);
					frm.set_value("pincode", r.message.pincode);
				}
				// })
			}
		});
	}
});

