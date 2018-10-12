// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Checks Group', {
	onload: function(frm){
		frm.trigger("get_tat");
	},
	refresh: function(frm){
		frm.trigger("get_tat");
	},
	get_tat: function(frm) {
        if(frm.doc.customer == "Aadhar Housing Finance Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "BorgWarner Morse TEC India Pvt Ltd. - BVS"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "IDFC Bharath Limited"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Igarashi Motors India Limited"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Lapiz & Customer Broad Cast"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Michelin India Tamilnadu Tyres Pvt Ltd"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Navia Markets Ltd"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Ninestars Information Technologies Pvt Ltd"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Nippon Express(India) Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Q Way Technologies"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Saint - Gobain India Private Limited - BVS"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Sun Network"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Ranstand"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "RED FM (Kal Radio, South Asia, Suryan FM, Udaya)"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Hannon"){
            frm.set_value("tat",10);
		}
		if(frm.doc.customer == "Gestamp Automotive Chennai Pvt Ltd"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "IQ Back Office"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Karnataka Bank"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "MANAPPURAM FINANCE LIMITED"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Muthoot Housing Finance Co Ltd"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Schwing Stetter (India) Private Limited"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "South Indian Bank"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "TCI Chemical (India) Private Ltd -BVS"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "The Federal Bank Ltd"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Manappuram Insurance"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Hinduja Leyland Finance"){
            frm.set_value("tat",8);
		}
		if(frm.doc.customer == "Manappuram Home Finance(White Lilles)"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Manappuram Vechile & Equipment"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Xerago"){
			frm.set_value("tat",15);
		}
		if(frm.doc.customer == "GAC Shipping"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Enlighted"){
            frm.set_value("tat",15);
		}
		if(frm.doc.customer == "Lider Consultancy Services Pvt Ltd"){
            frm.set_value("tat",7);
		}
		if(frm.doc.customer == "Xerago"){
			frm.set_value("tat",8);
		}
	}
});
