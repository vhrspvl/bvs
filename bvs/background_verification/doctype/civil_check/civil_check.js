// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Civil Check", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	validate: function(frm){
		if(frm.doc.applicant_id) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
	},
	refresh: function(frm){
		frappe.call({
			"method":"bvs.background_verification.doctype.education_check1.education_check1.get_value",
			args: {
				"applicant":frm.doc.applicant_id,
				},
			callback: function (r) {
				$.each(r.message, function(i, d) {
					if(r.message){
						console.log(r.message)
						frm.set_value("name2", d.candidate_name);
						frm.set_value("date_of_birth", d.dob);
						frm.set_value("age", d.age);
						frm.set_value("present_address", d.address_line1 + ",\n"+ d.address_line2 + ",\n"+ d.address_line3 + ",\n"+ d.talukdistrict + ",\n"+ d.city + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
					}
				})
			}
		});
	}
});

