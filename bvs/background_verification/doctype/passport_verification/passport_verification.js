// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Passport Verification", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.passport_number){
			me = $(cur_frm.fields_dict.passport_number.input);
			me.attr("length", "8");
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
		frappe.call({
			"method":"bvs.background_verification.doctype.aadhar_card_verification.aadhar_card_verification.get_value",
			args: {
				"applicant":frm.doc.applicant_id,
				},
			callback: function (r) {
				// $.each(r.message, function(i, d) {
				if(r.message){
					console.log(r.message)
					frm.set_value("date_of_birth", r.message.dob);
				}
				// })
			}
		});
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
		if(!frm.doc.passport_number){
			frappe.msgprint("Please Enter the Passport Number")
		}
		if(frm.doc.allocated_for == "Entry Pending"){
			if(frm.doc.status == "Insufficient"){
				frm.set_value("status","Insufficient")
			}else{
				frm.set_value("status","Entry Completed")
			}
		}
	},
	address_same_as:function(frm){
		if(frm.doc.address_same_as == "Present Address"){
			frappe.call({
				"method":"bvs.background_verification.doctype.education_check1.education_check1.get_value",
				args: {
					"applicant":frm.doc.applicant_id,
					},
				callback: function (r) {
					$.each(r.message, function(i, d) {
						if(d.address_line2 == null){
							frm.set_value("address", d.address_line1 + ",\n"+ d.talukdistrict + ",\n"+ d.city + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						} else if(d.address_line3 == null && d.talukdistrict != null){
							frm.set_value("address", d.address_line1 + ",\n"+ d.address_line2  + ",\n"+ d.talukdistrict + ",\n"+ d.city + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						}else if(d.address_line3 == null && d.talukdistrict == null){							
							frm.set_value("address", d.address_line1 + ",\n"+ d.address_line2  +  ",\n"+ d.city + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						} else if(d.talukdistrict == null){
							frm.set_value("address", d.address_line1 + ",\n"+ d.address_line2  + ",\n"+ d.address_line3 + ",\n"+ d.city + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						} else if(d.city == null){
							frm.set_value("address", d.address_line1 + ",\n"+ d.address_line2  + ",\n"+ d.address_line3 + ",\n"+ d.talukdistrict + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						}else if(d.city == null && d.address_line3 == null){
							frm.set_value("address", d.address_line1 + ",\n"+ d.address_line2  + ",\n"+ d.talukdistrict + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						} else {
							frm.set_value("address", d.address_line1 + ",\n"+ d.address_line2  + ",\n"+ d.address_line3 + ",\n"+ d.talukdistrict + ",\n"+ d.city + ",\n"+ d.state + ",\n"+ d.country + ",\n"+ d.pincode);
						}
					})
				}
			});
		} else {
			frm.set_value("address", "");
							
		}
	}
});
