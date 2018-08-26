// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Education Check3", {
	validate: function(frm){
		if(frm.doc.status == "Select"){
			frappe.msgprint(__("Please select the status"));
		}
		else if(frm.doc.status != "Select"){
			if(frm.doc.applicant_id) {
				frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			} 
		}
	}

});
