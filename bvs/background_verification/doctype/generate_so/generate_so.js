// Copyright (c) 2019, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Generate SO', {
    refresh: function (frm) {
        frm.disable_save();
    },
    // onload: function (frm) {
    //     frappe.call({
    //         "method": "frappe.client.get_list",
    //         args: {
    //             "doctype": "Applicant",
    //             filters: {
    //                 "sale_order_status": "Waiting"
    //             }
    //         },
    //         callback: function (r) {
    //             if (r.message) {
    //                 $.each(r.message, function (i, d) {
    //                     frappe.call({
    //                         "method": "frappe.client.get",
    //                         args: {
    //                             "doctype": "Applicant",
    //                             "name": d.name
    //                         },
    //                         callback: function (r) {
    //                             if ((r.message.status == "Positive") || (r.message.status == "Negative")) {
    //                                 var row = frappe.model.add_child(frm.doc, "Generate SO Details", "generate_so_details");
    //                                 row.ref_id = r.message.name;
    //                                 row.client_name = r.message.customer;
    //                                 row.candidate_name = r.message.candidate_name;
    //                                 row.in_date = r.message.in_date;
    //                                 row.end_date = r.message.end_date;
    //                                 row.overall_status = r.message.status;
    //                                 refresh_field("generate_so_details")
    //                             }
    //                         }
    //                     })
    //                 })
    //             }
    //         }
    //     })
    // },
    client: function (frm) {
        frm.clear_table("generate_so_details")
        refresh_field("generate_so_details")
        if (frm.doc.client) {
            frappe.call({
                "method": "frappe.client.get_list",
                args: {
                    "doctype": "Applicant",
                    filters: {
                        "customer": frm.doc.client,
                        "sale_order_status": "Waiting"
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
                                    if (((r.message.status == "Positive") || (r.message.status == "Negative")) && (r.message.customer == frm.doc.client)) {
                                        var row = frappe.model.add_child(frm.doc, "Generate SO Details", "generate_so_details");
                                        row.ref_id = r.message.name;
                                        row.client_name = r.message.customer;
                                        row.candidate_name = r.message.candidate_name;
                                        row.in_date = r.message.in_date;
                                        row.end_date = r.message.end_date;
                                        row.overall_status = r.message.status;
                                        refresh_field("generate_so_details")
                                    }
                                }
                            })
                        })
                    }
                }
            })
        }
    },
    to: function (frm) {
        if (frm.doc.client) {
            frappe.call({
                "method": "frappe.client.get_list",
                args: {
                    "doctype": "Applicant",
                    filters: {
                        "customer": frm.doc.client,
                        "sale_order_status": "Waiting"
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
                                    if (((r.message.status == "Positive") || (r.message.status == "Negative")) && (r.message.customer == frm.doc.client) && (r.message.in_date >= frm.doc.case_in_date) && (r.message.in_date <= frm.doc.to)) {
                                        var row = frappe.model.add_child(frm.doc, "Generate SO Details", "generate_so_details");
                                        row.ref_id = r.message.name;
                                        row.client_name = r.message.customer;
                                        row.candidate_name = r.message.candidate_name;
                                        row.in_date = r.message.in_date;
                                        row.end_date = r.message.end_date;
                                        row.overall_status = r.message.status;
                                        refresh_field("generate_so_details")
                                    }
                                }
                            })
                        })
                    }
                }
            })
        } else {
            frappe.msgprint("Please Select Client Name")
        }
    },
    batch_id: function (frm) {
        if (frm.doc.client) {
            frappe.call({
                "method": "frappe.client.get_list",
                args: {
                    "doctype": "Applicant",
                    filters: {
                        "customer": frm.doc.client,
                        "sale_order_status": "Waiting"
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
                                    if (((r.message.status == "Positive") || (r.message.status == "Negative")) && (r.message.customer == frm.doc.client) && (r.message.data_entry_allocation_id == frm.doc.batch_id)) {
                                        var row = frappe.model.add_child(frm.doc, "Generate SO Details", "generate_so_details");
                                        row.ref_id = r.message.name;
                                        row.client_name = r.message.customer;
                                        row.candidate_name = r.message.candidate_name;
                                        row.in_date = r.message.in_date;
                                        row.end_date = r.message.end_date;
                                        row.overall_status = r.message.status;
                                        refresh_field("generate_so_details")
                                    }
                                }
                            })
                        })
                    }
                }
            })
        } else {
            frappe.msgprint("Please Select Client Name")
        }
    },
    refresh: function (frm) {
        $(".grid-add-row").hide();
        frm.add_custom_button(__('Generate SO'), function () {
            var grid = frm.fields_dict["generate_so_details"].grid;
            if (grid.get_selected_children().length !== 0) {
                var child = []
                if (frm.doc.client) {
                    var len = grid.get_selected_children().length;
                    $.each(grid.get_selected_children(), function (i, d) {
                        var no = i + 1
                        child.push(no + "." + d.candidate_name)
                        frappe.call({
                            "method": "bvs.background_verification.doctype.generate_so.generate_so.update_so_status",
                            args: {
                                "ref_id": d.ref_id
                            },
                            callback: function (r) {

                            }
                        })
                    })
                    child = child.join("<br />");
                    frappe.call({
                        "method": "frappe.client.get",
                        args: {
                            "doctype": "Project",
                            filters: {
                                "customer": frm.doc.client
                            }
                        },
                        freeze: true,
                        freeze_message: "Loading....",
                        callback: function (r) {
                            if (r.message.name) {
                                frappe.call({
                                    "method": "bvs.background_verification.doctype.generate_so.generate_so.create_so",
                                    args: {
                                        "customer": frm.doc.client,
                                        "delivery_date": frappe.datetime.nowdate(),
                                        "project": r.message.name,
                                        "item_code": "Back Ground Verification Service",
                                        "qty": len,
                                        "child": child
                                    },
                                    callback: function (r) {
                                        if (r.message) {
                                            frappe.set_route("Form", "Sales Order", r.message.name);
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
                // }
            }
        })
    }
});



