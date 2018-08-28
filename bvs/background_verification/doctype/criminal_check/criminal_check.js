// Copyright (c) 2017, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Criminal Check", {
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
	same_as_present_address:function(frm){
		if(frm.doc.same_as_present_address === "Yes") {
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
		} else if(frm.doc.same_as_present_address === "NO"){
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
	same_as_permanent_address:function(frm){
		if(frm.doc.same_as_permanent_address === "Yes"){
			frappe.call({
				"method": "bvs.background_verification.doctype.criminal_check.criminal_check.get_doc",
				args: {
					"applicant": frm.doc.applicant_id
				},
				callback: function(r){
					console.log(r.message)
					frm.set_value("address_line1",r.message[0]);
					frm.set_value("address_line2",r.message[1]);
					frm.set_value("address_line3",r.message[2]);
					frm.set_value("talukdistrict",r.message[3]);
					frm.set_value("state",r.message[4]);
					frm.set_value("city",r.message[5]);
					frm.set_value("country",r.message[6]);
					frm.set_value("pincode",r.message[7]);
				}

			})

		} else if(frm.doc.same_as_permanent_address === "NO"){
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

