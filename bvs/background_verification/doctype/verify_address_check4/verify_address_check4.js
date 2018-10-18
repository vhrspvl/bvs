// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on("Verify Address Check4", {
	after_save: function(frm) {
		if(frm.doc.applicant_id) {
			if(frappe.user.has_role("BVS DEO")) {
			frappe.set_route("Form","Applicant",frm.doc.applicant_id);
			}
		} 
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
	},
	onload:function(frm){
		if(!frm.doc.in_date){
            frm.set_value("in_date",(frappe.datetime.nowdate()));
		}
		frappe.call({
			"method": "bvs.background_verification.doctype.verify_address_check4.verify_address_check4.get_check",
			args: {
				applicant_id: frm.doc.applicant_id
			},
			callback: function(r){
				$.each(r.message, function(i, d) {
					if(r.message){
						frm.set_value("address_check4_id", d.name);
					}
				});
			}

		});
	},
	validate:function(frm){
		if(frm.doc.tat){
			frm.set_df_property('tat', 'read_only', 1);
		}
		if(!frm.doc.actual_end_date){
			var tomorrow = moment(frm.doc.in_date).add(frm.doc.tat, 'days');
            frm.set_value("actual_end_date", tomorrow);
		}
		if(frm.doc.allocated_for == "Allocation Pending"){
			if(frm.doc.executive == frappe.session.user){
				frm.set_value("status","Completed")
				frm.set_value("allocated_for","Allocation Completed")
				if(!frm.doc.end_date){
					if(frm.doc.status != ("Completed"||"Pending")){
					frm.set_value("end_date",(frappe.datetime.nowdate()))
					}
				}
		      }
		}
		if(frm.doc.customer == "Aadhar Housing Finance Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "BorgWarner Morse TEC India Pvt Ltd. - BVS"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "IDFC Bharath Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Igarashi Motors India Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Lapiz & Customer Broad Cast"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Michelin India Tamilnadu Tyres Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Navia Markets Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Ninestars Information Technologies Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Nippon Express(India) Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Q Way Technologies"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Saint - Gobain India Private Limited - BVS"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Sun Network"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Ranstand"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "RED FM (Kal Radio, South Asia, Suryan FM, Udaya)"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Hannon"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Gestamp Automotive Chennai Pvt Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "IQ Back Office"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Karnataka Bank"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "MANAPPURAM FINANCE LIMITED"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Muthoot Housing Finance Co Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Schwing Stetter (India) Private Limited"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "South Indian Bank"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "TCI Chemical (India) Private Ltd -BVS"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "The Federal Bank Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Manappuram Insurance"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Hinduja Leyland Finance"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Manappuram Home Finance(White Lilles)"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Manappuram Vechile & Equipment"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Xerago"){
			frm.set_value("tat",13);
		}
		if(frm.doc.customer == "GAC Shipping"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Enlighted"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Lider Consultancy Services Pvt Ltd"){
            frm.set_value("tat",13);
		}
		if(frm.doc.customer == "Xerago"){
			frm.set_value("tat",13);
		}
	},
	refresh: function(frm){
		if(frm.doc.allocated_for){
			$(cur_frm.fields_dict.allocated_for.input).css("backgroundColor","DeepPink");
		}
	}
	

});
