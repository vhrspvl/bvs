// Copyright (c) 2019, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Insufficient Case Details', {
    refresh: function (frm) {
        frm.disable_save();
    },
    onload: function (frm) {
        frappe.call({
            "method": "frappe.client.get_list",
            args: {
                "doctype": "Applicant",
            },
            callback: function (r) {
                if (r.message) {
                    $.each(r.message, function (i, d) {
                        frappe.call({
                            "method": "frappe.client.get",
                            args: {
                                "doctype": "Applicant",
                                "name": d.name
                            },
                            callback: function (r) {
                                if (r.message.status == "Insufficient") {
                                    var row = frappe.model.add_child(frm.doc, "Insuff Case Details", "insuff_case_details");
                                    row.ref_id = r.message.name;
                                    row.candidate_name = r.message.candidate_name;
                                    row.in_date = r.message.in_date;
                                    row.status = r.message.status;
                                    row.tat = r.message.tat;
                                    refresh_field("insuff_case_details")
                                }
                            }
                        })
                    })
                }
            }
        })
    },
})
