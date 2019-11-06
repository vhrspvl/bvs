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
                filters: {
                    "status": "Insufficient"
                }
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
                                    row.emp_code = r.message.client_employee_code;
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
    client: function (frm) {
        frappe.call({
            "method": "frappe.client.get_list",
            args: {
                "doctype": "Applicant",
                filters: {
                    "status": "Insufficient"
                }
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
                                if (r.message.status == "Insufficient" && frm.doc.client == r.message.customer) {
                                    var row = frappe.model.add_child(frm.doc, "Insuff Case Details", "insuff_case_details");
                                    row.ref_id = r.message.name;
                                    row.emp_code = r.message.client_employee_code;
                                    row.candidate_name = r.message.candidate_name;
                                    row.in_date = r.message.in_date;
                                    row.status = r.message.status;
                                    refresh_field("insuff_case_details")
                                }
                            }
                        })
                    })
                }
            }
        })
    },
    'onload_post_render': function (frm, cdt, cdn) {
        var list = frm.doc.insuff_case_details;
        frm.fields_dict.insuff_case_details.grid.wrapper.on('focus', 'input[data-fieldname="ref_id"][data-doctype="Insuff Case Details"]', function (e) {
            var current_doc = $('.data-row.editable-row').parent().attr("data-name");
            var d = locals["Insuff Case Details"][current_doc];
            if (d.ref_id) {
                frappe.set_route("Form", "Applicant", d.ref_id)
            }
        })
    }
})
