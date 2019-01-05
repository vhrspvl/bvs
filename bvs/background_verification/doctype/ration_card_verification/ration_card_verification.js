// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Ration Card Verification", {
	update: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
	},
	after_save: function(frm){
		if(frm.doc.checks_group){
			if(frm.doc.status == "IQC Completed"){
				frappe.call({
					"method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
					args:{
						"applicant": frm.doc.applicant_id,
						"checks_group": frm.doc.checks_group,
						"doctype": doctype.name,
						"check_status": frm.doc.status
					},
					callback: function(r){
						if(r.message.doctype){
							if(r.message.status != frm.doc.status) {
								frappe.set_route('Form',r.message.doctype,r.message.name);
							}
						} else if(r.message != "Completed"){
							frappe.set_route('Form',r.message,'New '+r.message,{"tat": frm.doc.tat,"applicant_name": frm.doc.applicant_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.applicant_id});
						} else if(r.message == "Completed"){
							frappe.set_route('Form',"Applicant",frm.doc.applicant_id);
						} 
					}
				})
			} else {
				frappe.confirm(
					'Do you want to attach the File?',
					function(){
						window.close();
					},
					function(){
						frappe.call({
							"method": "bvs.background_verification.doctype.applicant.applicant.get_checks_group",
							args:{
								"applicant": frm.doc.applicant_id,
								"checks_group": frm.doc.checks_group,
								"doctype": doctype.name,
								"check_status": frm.doc.status
							},
							callback: function(r){
								if(r.message.doctype){
									if(r.message.status != frm.doc.status) {
										frappe.set_route('Form',r.message.doctype,r.message.name);
									}
								} else if(r.message != "Completed"){
									frappe.set_route('Form',r.message,'New '+r.message,{"tat": frm.doc.tat,"applicant_name": frm.doc.applicant_name,"customer":frm.doc.customer,"checks_group":frm.doc.checks_group,"applicant_id":frm.doc.applicant_id});
								} else if(r.message == "Completed"){
									frappe.set_route('Form',"Applicant",frm.doc.applicant_id);
								} 
							}
						})
					}
				)
			}
		}
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
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
		frm.add_custom_button(__('Back'), function () {
			frappe.set_route("Form", "Applicant",frm.doc.applicant_id)
		});
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
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
			})
			} else {
				frm.set_value("address", "");
			}
	}
});