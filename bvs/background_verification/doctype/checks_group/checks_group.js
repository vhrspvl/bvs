// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Checks Group', {
	validate: function(frm){
		if((frm.doc.price1) || (frm.doc.price2) || (frm.doc.price3) || (frm.doc.price4) || (frm.doc.price5) || (frm.doc.price6) || (frm.doc.price7) || (frm.doc.price8) || (frm.doc.price9) || (frm.doc.price10) || (frm.doc.price11) || (frm.doc.price12) || (frm.doc.price13)){
			// frm.set_value("price",(frm.doc.price1 + frm.doc.price2 + frm.doc.price3 + frm.doc.price4 + frm.doc.price5 + frm.doc.price6 + frm.doc.price7 + frm.doc.price8 + frm.doc.price9 + frm.doc.price10 + frm.doc.price11 + frm.doc.price12 + frm.doc.price13));
		}
	}
});



