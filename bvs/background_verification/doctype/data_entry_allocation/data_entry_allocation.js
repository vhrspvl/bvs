// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Data Entry Allocation', {
    refresh: function (frm) {
    },
    validate: function (frm) {
        if (frm.doc.status != "Updated") {
            frm.set_value("cases_pending", frm.doc.no_of_cases);
            frm.set_value("status", "Updated");
        }
        if (frm.doc.demographic_entry == 1) {
            frappe.call({
                "method": "bvs.background_verification.doctype.data_entry_allocation.data_entry_allocation.mark_applicant",
                args: {
                    "customer": frm.doc.customer,
                    "data_entry_allocation_id": frm.doc.name,
                    "executive": frm.doc.executive,
                    "no": frm.doc.no_of_cases
                },
                callback: function (r) {
                    //console.log(r.message)

                }
            })
        }
        frm.clear_table("data_entry_allocation_executive");
        frappe.call({
            "method": "bvs.background_verification.doctype.data_entry_allocation.data_entry_allocation.get_pending_cases",
            args: {
            },
            callback: function (r) {
                if (r.message) {
                    var c = Object.keys(r.message).length;
                    for (var i = 0; i < c; i++) {
                        var row = frappe.model.add_child(frm.doc, "Data Entry Allocation Executive", "data_entry_allocation_executive");
                        row.executive = r.message[i].executive;
                        row.pending_cases = r.message[i].pending_cases;
                    }
                }
                refresh_field("data_entry_allocation_executive");
                if (!frm.doc.save_status) {
                    frm.set_value("save_status", "Updated")
                }
            }
        })

    },
    after_save: function (frm) {
        if (frm.doc.save_status == "Updated") {
            frm.save();
            frm.set_value("save_status", "Updated SuccessFully")
        }
    },
    onload: function (frm) {
        if (!frm.doc.in_date) {
            frm.set_value("in_date", (frappe.datetime.nowdate()));
        }
        // frm.clear_table("data_entry_allocation_executive");				
        // frappe.call({
        // 	"method":"bvs.background_verification.doctype.data_entry_allocation.data_entry_allocation.get_pending_cases",
        // 	args:{				
        // 	},
        // 	callback:function(r){
        // 		if(r.message){
        // 			var c = Object.keys(r.message).length;
        // 			for(var i=0; i< c; i++){
        // 				console.log(r.message[i].pending_cases)
        // 				var row = frappe.model.add_child(frm.doc, "Data Entry Allocation Executive", "data_entry_allocation_executive");
        // 				row.executive = r.message[i].executive;
        // 				row.pending_cases = r.message[i].pending_cases;						
        // 			}						
        // 		}
        // 		refresh_field("data_entry_allocation_executive");					 
        // 	}
        // })
    }
});
